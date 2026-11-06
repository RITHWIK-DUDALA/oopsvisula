const http = require('http');
const assert = require('assert');

async function testRoute(urlPath) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:4173' + urlPath, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          isHtml: data.includes('<!doctype html>') || data.includes('<html'),
          hasRoot: data.includes('id="root"'),
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Testing SPA Routing Fallback & Deployment Headers on Port 4173...');
  const routes = [
    '/',
    '/app/playground',
    '/app/concepts',
    '/app/concepts/oop/classes',
    '/app/visualizer',
    '/about',
  ];

  for (const r of routes) {
    const res = await testRoute(r);
    assert.strictEqual(res.statusCode, 200, `Route ${r} must return 200`);
    assert.strictEqual(res.isHtml, true, `Route ${r} must return HTML SPA fallback`);
    assert.strictEqual(res.hasRoot, true, `Route ${r} must contain root element`);
    assert.ok(res.headers['content-security-policy'], `Route ${r} must have CSP header`);
    assert.strictEqual(res.headers['x-frame-options'], 'DENY');
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.strictEqual(res.headers['referrer-policy'], 'strict-origin-when-cross-origin');
    assert.strictEqual(res.headers['permissions-policy'], 'camera=(), microphone=(), geolocation=()');
    console.log(`  ✓ Route ${r} -> 200 OK, SPA index.html returned, Security Headers intact`);
  }

  // Also test asset serving
  const assetRes = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:4173/assets/vendor-react-BoOE8enc.js', res => {
      resolve({ statusCode: res.statusCode, headers: res.headers });
    }).on('error', reject);
  });
  assert.strictEqual(assetRes.statusCode, 200, 'Hashed asset must return 200 OK');
  console.log('  ✓ Hashed asset /assets/vendor-react-BoOE8enc.js -> 200 OK');

  console.log('🎉 SPA Routing and Production Ingress Verified 100%!');
}

run().catch(err => {
  console.error('SPA verification failed:', err);
  process.exit(1);
});

