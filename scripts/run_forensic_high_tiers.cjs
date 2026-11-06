/**
 * OOPS LAB — FORENSIC LOAD TEST: HIGH CONCURRENCY KNEE FINDER
 * Escalates from 400 to 1,200 concurrent users against live Vite server
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const TARGET_HOST = '127.0.0.1';
const TARGET_PORT = 5173;

const STUDENT_PATHS = [
  '/',
  '/src/main.tsx',
  '/src/app/routes.tsx'
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
          'User-Agent': 'OOPS-Lab-HighLoad-Finder'
        },
        timeout: timeoutMs
      },
      (res) => {
        let bytes = 0;
        res.on('data', chunk => { bytes += chunk.length; });
        res.on('end', () => {
          const elapsedMs = Number(process.hrtime.bigint() - t0) / 1_000_000;
          resolve({ ok: res.statusCode === 200, status: res.statusCode, latency: elapsedMs });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      const elapsedMs = Number(process.hrtime.bigint() - t0) / 1_000_000;
      resolve({ ok: false, error: 'ETIMEDOUT', latency: elapsedMs });
    });

    req.on('error', (err) => {
      const elapsedMs = Number(process.hrtime.bigint() - t0) / 1_000_000;
      resolve({ ok: false, error: err.code || err.message, latency: elapsedMs });
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

async function runHighTiers() {
  const tiers = [500, 600, 700, 800, 900, 1000, 1100, 1200];
  const results = [];

  for (const c of tiers) {
    const requestsPerUser = 3;
    const totalReqs = c * requestsPerUser;
    process.stdout.write(`▶ Tier ${c} concurrent users (${totalReqs} reqs)... `);

    const tStart = Date.now();
    const userRes = [];
    const errors = {};

    const promises = [];
    for (let u = 0; u < c; u++) {
      promises.push((async () => {
        for (let r = 0; r < requestsPerUser; r++) {
          await new Promise(res => setTimeout(res, Math.random() * 8 + 2));
          const p = STUDENT_PATHS[(u + r) % STUDENT_PATHS.length];
          const out = await executeLiveRequest(p, 3000);
          userRes.push(out);
          if (!out.ok) {
            const k = out.error || `HTTP_${out.status}`;
            errors[k] = (errors[k] || 0) + 1;
          }
        }
      })());
    }

    await Promise.all(promises);
    const durSec = (Date.now() - tStart) / 1000;

    const okCount = userRes.filter(r => r.ok).length;
    const succRate = (okCount / userRes.length) * 100;
    const throughput = okCount / durSec;
    const stats = calculatePercentiles(userRes.map(r => r.latency));

    let status = 'HEALTHY';
    if (succRate < 80 || stats.p95 > 2500) status = 'FAILED';
    else if (succRate < 95 || stats.p95 > 500) status = 'DEGRADED';

    console.log(`[${status}]`);
    console.log(`   Success: ${succRate.toFixed(1)}% (${okCount}/${userRes.length}) | ${throughput.toFixed(1)} req/s | p50: ${stats.p50}ms | p95: ${stats.p95}ms | p99: ${stats.p99}ms | Max: ${stats.max}ms`);
    if (Object.keys(errors).length > 0) {
      console.log(`   Errors: ${JSON.stringify(errors)}`);
    }

    results.push({ concurrency: c, succRate, throughput, p50: stats.p50, p95: stats.p95, p99: stats.p99, max: stats.max, status, errors });

    if (status === 'FAILED') {
      console.log(`\n💥 STOPPING: Failure knee hit at ${c} concurrent users.`);
      break;
    }

    await new Promise(r => setTimeout(r, 500));
  }

  // Append results to raw data
  const rawPath = path.resolve(__dirname, '../PRODUCTION_AUDIT/forensic_high_load_raw.json');
  fs.writeFileSync(rawPath, JSON.stringify(results, null, 2));
}

runHighTiers().catch(console.error);

