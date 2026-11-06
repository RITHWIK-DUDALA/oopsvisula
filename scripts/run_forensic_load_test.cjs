/**
 * OOPS LAB — FORENSIC CONTROLLED CONCURRENCY LOAD TEST
 * Executes live HTTP requests against the running staging server (http://localhost:5173)
 * with independent virtual student contexts, actual network socket measurements,
 * and fine-grained stepped concurrency to find the real degradation and failure knees.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const TARGET_HOST = '127.0.0.1';
const TARGET_PORT = 5173;
const TARGET_URL = `http://${TARGET_HOST}:${TARGET_PORT}`;

console.log('========================================================================');
console.log('  OOPS LAB — FORENSIC LOAD TEST & EXACT CAPACITY MEASUREMENT            ');
console.log('========================================================================');
console.log(`Target: ${TARGET_URL} (Running Vite Dev Server)`);
console.log('Testing independent live network requests with fine-grained stepped concurrency...\n');

// Realistic student user paths
const STUDENT_PATHS = [
  '/',
  '/src/main.tsx',
  '/src/app/routes.tsx',
  '/src/features/landing/LandingPage.tsx'
];

function executeLiveRequest(reqPath, timeoutMs = 3000) {
  return new Promise((resolve) => {
    const t0 = process.hrtime.bigint();
    const req = http.request(
      {
        hostname: TARGET_HOST,
        port: TARGET_PORT,
        path: reqPath,
        method: 'GET',
        headers: {
          'Connection': 'keep-alive',
          'User-Agent': 'OOPS-Lab-Forensic-Tester/1.0',
          'Accept': 'text/html,application/javascript,*/*'
        },
        timeout: timeoutMs
      },
      (res) => {
        let bytes = 0;
        res.on('data', chunk => { bytes += chunk.length; });
        res.on('end', () => {
          const elapsedMs = Number(process.hrtime.bigint() - t0) / 1_000_000;
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 400,
            status: res.statusCode,
            bytes,
            latency: elapsedMs,
            error: null
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      const elapsedMs = Number(process.hrtime.bigint() - t0) / 1_000_000;
      resolve({ ok: false, status: 0, bytes: 0, latency: elapsedMs, error: 'ETIMEDOUT' });
    });

    req.on('error', (err) => {
      const elapsedMs = Number(process.hrtime.bigint() - t0) / 1_000_000;
      resolve({ ok: false, status: 0, bytes: 0, latency: elapsedMs, error: err.code || err.message });
    });

    req.end();
  });
}

function calculatePercentiles(latencies) {
  if (latencies.length === 0) return { p50: 0, p95: 0, p99: 0, max: 0 };
  const sorted = [...latencies].sort((a, b) => a - b);
  const getP = (p) => sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
  return {
    p50: Number(getP(50).toFixed(2)),
    p95: Number(getP(95).toFixed(2)),
    p99: Number(getP(99).toFixed(2)),
    max: Number(sorted[sorted.length - 1].toFixed(2))
  };
}

async function testTier(concurrency, requestsPerUser = 4) {
  const totalRequests = concurrency * requestsPerUser;
  process.stdout.write(`▶ Testing Tier: ${String(concurrency).padStart(4)} concurrent users (${totalRequests} requests)... `);

  const tStart = Date.now();
  const allResults = [];
  const errorCounts = {};

  const userPromises = [];
  for (let u = 0; u < concurrency; u++) {
    userPromises.push((async () => {
      for (let r = 0; r < requestsPerUser; r++) {
        // Realistic student think time: 5-15ms
        await new Promise(res => setTimeout(res, Math.random() * 10 + 5));
        const reqPath = STUDENT_PATHS[(u + r) % STUDENT_PATHS.length];
        const res = await executeLiveRequest(reqPath, 3000);
        allResults.push(res);
        if (!res.ok) {
          const errKey = res.error || `HTTP_${res.status}`;
          errorCounts[errKey] = (errorCounts[errKey] || 0) + 1;
        }
      }
    })());
  }

  await Promise.all(userPromises);
  const totalDurationSec = (Date.now() - tStart) / 1000;

  const successful = allResults.filter(r => r.ok).length;
  const failed = allResults.length - successful;
  const successRate = (successful / allResults.length) * 100;
  const throughput = successful / totalDurationSec;

  const latencies = allResults.map(r => r.latency);
  const stats = calculatePercentiles(latencies);

  // Classification:
  let tierHealth = 'HEALTHY';
  if (successRate < 80.0 || stats.p95 > 2000) {
    tierHealth = 'FAILED';
  } else if (successRate < 95.0 || stats.p95 > 500) {
    tierHealth = 'DEGRADED';
  }

  console.log(`[${tierHealth}]`);
  console.log(`   Success: ${successRate.toFixed(1)}% (${successful}/${allResults.length}) | Throughput: ${throughput.toFixed(1)} req/s | Duration: ${totalDurationSec.toFixed(2)}s`);
  console.log(`   Latencies: p50=${stats.p50}ms, p95=${stats.p95}ms, p99=${stats.p99}ms, Max=${stats.max}ms`);
  if (failed > 0) {
    console.log(`   Errors: ${JSON.stringify(errorCounts)}`);
  }

  return {
    concurrency,
    totalRequests: allResults.length,
    successful,
    failed,
    successRate: Number(successRate.toFixed(2)),
    throughput: Number(throughput.toFixed(2)),
    durationSec: Number(totalDurationSec.toFixed(2)),
    p50: stats.p50,
    p95: stats.p95,
    p99: stats.p99,
    max: stats.max,
    health: tierHealth,
    errors: errorCounts
  };
}

async function main() {
  // 1. Initial connectivity probe
  const probe = await executeLiveRequest('/', 3000);
  if (!probe.ok) {
    console.error(`ERROR: Cannot reach ${TARGET_URL}. Is Vite dev server running?`);
    console.error(`Probe error:`, probe.error || probe.status);
    process.exit(1);
  }
  console.log(`✓ Staging connectivity verified: HTTP ${probe.status} (${probe.latency.toFixed(1)}ms)\n`);

  // Stepped concurrency tiers: 10, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400
  const tiers = [10, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400];
  const tierReports = [];

  let lastHealthy = null;
  let firstDegraded = null;
  let firstFailed = null;

  for (const c of tiers) {
    const report = await testTier(c, 4);
    tierReports.push(report);

    if (report.health === 'HEALTHY') {
      lastHealthy = c;
    } else if (report.health === 'DEGRADED' && !firstDegraded) {
      firstDegraded = c;
    } else if (report.health === 'FAILED' && !firstFailed) {
      firstFailed = c;
      console.log(`\n💥 STOPPING: Reached failure threshold at ${c} concurrent users.`);
      break;
    }

    // Cooling pause between tiers (400ms)
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n========================================================================');
  console.log('  FORENSIC TEST COMPLETE — EMPIRICAL REPRODUCED SUMMARY                ');
  console.log('========================================================================');
  console.log(`Last Healthy Tier:    ${lastHealthy ? lastHealthy + ' concurrent users' : 'None'}`);
  console.log(`First Degraded Tier:  ${firstDegraded ? firstDegraded + ' concurrent users' : 'None observed'}`);
  console.log(`First Failed Tier:    ${firstFailed ? firstFailed + ' concurrent users' : 'None observed (< ' + tiers[tiers.length - 1] + ')'}`);
  console.log('========================================================================\n');

  // Save raw results to JSON file for mathematical audit
  const rawPath = path.resolve(__dirname, '../PRODUCTION_AUDIT/forensic_raw_test_data.json');
  fs.writeFileSync(rawPath, JSON.stringify(tierReports, null, 2));
  console.log(`✓ Raw test results saved to: ${rawPath}`);
}

main().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});

