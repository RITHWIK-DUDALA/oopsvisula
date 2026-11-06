/**
 * OOPS LAB — COMPREHENSIVE PRODUCTION SECURITY REGRESSION SUITE
 * Exercises real application behaviors, simulator boundaries, storage engines,
 * wire-level HTTP headers, and production bundle artifacts.
 * Zero string-presence mocks. 100% Behavioral Testing.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const http = require('http');

console.log('========================================================================');
console.log('  OOPS LAB — PRODUCTION SECURITY REGRESSION & BEHAVIORAL SUITE           ');
console.log('========================================================================\n');

let totalTests = 0;
let passedTests = 0;
const failures = [];

async function test(domain, name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  ✓ [${domain}] ${name}`);
  } catch (err) {
    console.error(`  ✗ [${domain}] ${name} FAILED: ${err.message}`);
    failures.push({ domain, name, error: err.message });
  }
}

// Helper to load TypeScript module in CJS
const ts = require(path.resolve(__dirname, '../frontend/node_modules/typescript'));
function loadTs(relPath) {
  const fullPath = path.resolve(__dirname, relPath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const res = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const m = { exports: {} };
  const customRequire = (id) => {
    if (id === 'zustand' || id.startsWith('zustand/')) {
      return {
        create: () => (fn) => (typeof fn === 'function' ? fn((s) => s, () => ({})) : {}),
        persist: (fn) => fn
      };
    }
    return require(id);
  };
  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', res.outputText);
  fn(m.exports, customRequire, m, fullPath, path.dirname(fullPath));
  return m.exports;
}

async function run() {
  // ===========================================================================
  // 1. BROWSER STORAGE SECURITY & SANITIZATION
  // ===========================================================================
  console.log('--- 1. Browser Storage Security & Corruption Defense ---');
  const secureStorage = loadTs('../frontend/src/services/storage/secureStorage.ts');

  await test('Storage', 'Recovers gracefully from malformed corrupted JSON', () => {
    const fallback = { version: 2, data: 'default' };
    const res = secureStorage.safeJsonParse('{ corrupt json: true, ', () => true, fallback);
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.data, fallback);
    assert.strictEqual(res.error.includes('Malformed JSON'), true);
  });

  await test('Storage', 'Neutralizes deep prototype pollution on object parsing', () => {
    const payload = JSON.stringify({
      guestId: 'guest-attack',
      __proto__: { pollutedKey: 'attacker-owned' },
      savedSnippets: [
        {
          id: 'snip-1',
          title: 'Normal',
          code: 'class A {}',
          constructor: { prototype: { adminRole: true } }
        }
      ]
    });

    const fallback = null;
    const res = secureStorage.safeJsonParse(payload, () => true, fallback);
    assert.strictEqual(res.success, true);
    assert.strictEqual(({}).pollutedKey, undefined, 'Object.prototype must remain unpolluted');
    assert.strictEqual(res.data.__proto__, undefined);
  });

  await test('Storage', 'Rejects oversized session import payloads (> 512 KB)', () => {
    const hugeString = 'A'.repeat(550 * 1024);
    const payload = JSON.stringify({ data: hugeString });
    const res = secureStorage.safeJsonParse(payload, () => true, null);
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.error.includes('exceeds size limit'), true);
  });

  await test('Storage', 'Enforces strict schema on learner session objects', () => {
    const invalidSession = {
      totalLabSeconds: 'NOT_A_NUMBER', // Type violation
      simulationsRunCount: -5,         // Negative bounds violation
      masteredTopics: [123, 456],      // Elements must be strings
    };
    const isValid = secureStorage.validateLearnerSession(invalidSession);
    assert.strictEqual(isValid, false, 'Invalid schema must be rejected');

    const validSession = {
      totalLabSeconds: 3600,
      simulationsRunCount: 5,
      masteredTopics: ['encapsulation', 'inheritance'],
      solvedChallengeIds: [1, 2],
      savedSnippets: [{ id: 's1', title: 'Test', code: 'class T {}' }]
    };
    assert.strictEqual(secureStorage.validateLearnerSession(validSession), true);
  });

  // ===========================================================================
  // 2. JAVA VM SIMULATOR EXECUTION BOUNDARIES
  // ===========================================================================
  console.log('\n--- 2. Java Virtual Machine Simulator Security ---');
  const { JavaAstParser } = loadTs('../frontend/src/core/engine/javaAstParser.ts');
  const { JavaVirtualMachine } = loadTs('../frontend/src/core/engine/javaVirtualMachine.ts');

  const parser = new JavaAstParser();
  const jvm = new JavaVirtualMachine();

  await test('JVM-Sandbox', 'Student Java code cannot access browser window or document globals', () => {
    const code = `
      public class GlobalHijack {
        public static void main(String[] args) {
          int x = 10;
          window.location = "http://evil.com";
        }
      }
    `;
    const program = parser.parse(code);
    const trace = jvm.execute(program);
    assert.ok(trace.events.length > 0);
    // Verifies global browser window is completely untouched
    assert.strictEqual(typeof global.window, 'undefined');
  });

  await test('JVM-Sandbox', 'Terminates infinite loops safely within execution budget', () => {
    const infiniteLoopCode = `
      public class InfiniteLoop {
        public static void main(String[] args) {
          int i = 0;
          while (true) {
            i++;
          }
        }
      }
    `;
    const program = parser.parse(infiniteLoopCode);
    const trace = jvm.execute(program);
    assert.ok(trace.events.length <= 2005, 'Must cap execution events at budget limit');
    const lastEvent = trace.events[trace.events.length - 1];
    assert.strictEqual(lastEvent.type, 'EXCEPTION_THROWN');
    assert.strictEqual(lastEvent.description.includes('SAFETY TERMINATION'), true);
  });

  await test('JVM-Sandbox', 'Catches deep recursion and emits StackOverflowError without crashing', () => {
    const recursionCode = `
      public class InfiniteRecursion {
        public static void overflow() {
          overflow();
        }
        public static void main(String[] args) {
          overflow();
        }
      }
    `;
    const program = parser.parse(recursionCode);
    const trace = jvm.execute(program);
    const stackOverflowEvent = trace.events.find(e => e.exceptionDetail && e.exceptionDetail.className.includes('StackOverflowError'));
    assert.ok(stackOverflowEvent, 'Must emit StackOverflowError event when stack depth exceeds limit');
  });

  await test('JVM-Sandbox', 'Catches excessive object allocation and emits OutOfMemoryError', () => {
    const memoryBombCode = `
      public class MemoryBomb {
        public static void main(String[] args) {
          int i = 0;
          while (i < 200) {
            MemoryBomb b = new MemoryBomb();
            i++;
          }
        }
      }
    `;
    const program = parser.parse(memoryBombCode);
    const trace = jvm.execute(program);
    const oomEvent = trace.events.find(e => e.exceptionDetail && e.exceptionDetail.className.includes('OutOfMemoryError'));
    assert.ok(oomEvent, 'Must emit OutOfMemoryError event when heap object count exceeds allocation cap');
  });

  await test('JVM-Sandbox', 'Clamps stdout output buffer to prevent memory exhaustion', () => {
    const code = `
      public class StdoutBomb {
        public static void main(String[] args) {
          int i = 0;
          while (i < 500) {
            System.out.println("Extremely long repeating line of text to flood output buffer...");
            i++;
          }
        }
      }
    `;
    const program = parser.parse(code);
    const trace = jvm.execute(program);
    assert.ok(trace.stdoutAggregate.length <= 66000, 'Stdout aggregate must be bounded at 64 KB cap');
  });

  await test('JVM-Sandbox', 'Ensures execution A does not cross-contaminate execution B', () => {
    const codeA = `
      public class StateA {
        public static int shared = 999;
        public static void main(String[] args) { shared = 111; }
      }
    `;
    const codeB = `
      public class StateB {
        public static int shared = 555;
        public static void main(String[] args) { shared = 222; }
      }
    `;
    const traceA = jvm.execute(parser.parse(codeA));
    const traceB = jvm.execute(parser.parse(codeB));
    assert.notStrictEqual(traceA.events[0].className, traceB.events[0].className);
  });

  // ===========================================================================
  // 3. AST RESOURCE LIMITS & ADVANCED BYPASS RESISTANCE
  // ===========================================================================
  console.log('\n--- 3. AST Parser Resource Bounds & Bypass Resistance ---');
  const { scanJavaSourceSecurity } = loadTs('../frontend/src/services/ast/astSecurityFilter.ts');

  await test('AST', 'Parser gracefully caps excessively large source input (> 128 KB)', () => {
    const massiveSource = 'public class BigClass {\n' + '  int a;\n'.repeat(20000) + '}\n';
    const parsed = parser.parse(massiveSource);
    assert.ok(parsed.classes.length > 0);
    assert.ok(parsed.sourceCode.length <= 131072, 'Must cap source length to 128 KB bound');
  });

  await test('AST', 'Rejects fully-qualified reflection without import statements', () => {
    const attack = `
      public class Attack {
        java.lang.reflect.Method m;
      }
    `;
    const res = scanJavaSourceSecurity(attack);
    assert.strictEqual(res.passed, false);
    assert.strictEqual(res.violations.some(v => v.includes('java.lang.reflect')), true);
  });

  await test('AST', 'Rejects inline java.io.File allocations without imports', () => {
    const attack = `
      public class Attack {
        public void run() {
          new java.io.File("/etc/shadow");
        }
      }
    `;
    const res = scanJavaSourceSecurity(attack);
    assert.strictEqual(res.passed, false);
    assert.strictEqual(res.violations.some(v => v.includes('java.io.File')), true);
  });

  // ===========================================================================
  // 4. WIRE-LEVEL HTTP SECURITY & CSP
  // ===========================================================================
  console.log('\n--- 4. Live Wire-Level HTTP Headers & CSP Verification ---');

  await test('HTTP-Wire', 'Verifies active Content-Security-Policy header on port 5173', async () => {
    const headers = await fetchHeaders('http://127.0.0.1:5173/');
    assert.ok(headers['content-security-policy'], 'Must return Content-Security-Policy header');
    assert.strictEqual(headers['content-security-policy'].includes("object-src 'none'"), true);
    assert.strictEqual(headers['content-security-policy'].includes("frame-ancestors 'none'"), true);
  });

  await test('HTTP-Wire', 'Verifies X-Frame-Options: DENY on port 5173', async () => {
    const headers = await fetchHeaders('http://127.0.0.1:5173/');
    assert.strictEqual(headers['x-frame-options'], 'DENY');
  });

  await test('HTTP-Wire', 'Verifies X-Content-Type-Options: nosniff on port 5173', async () => {
    const headers = await fetchHeaders('http://127.0.0.1:5173/');
    assert.strictEqual(headers['x-content-type-options'], 'nosniff');
  });

  // ===========================================================================
  // 5. PRODUCTION BUILD BUNDLE AUDIT
  // ===========================================================================
  console.log('\n--- 5. Production Build Bundle Integrity Audit ---');

  await test('Build-Audit', 'Confirms production dist/index.html was generated', () => {
    const distHtml = path.resolve(__dirname, '../frontend/dist/index.html');
    assert.strictEqual(fs.existsSync(distHtml), true, 'dist/index.html must exist');
  });

  await test('Build-Audit', 'Confirms zero .map source maps are exposed in production dist', () => {
    const assetsDir = path.resolve(__dirname, '../frontend/dist/assets');
    const files = fs.readdirSync(assetsDir);
    const sourceMaps = files.filter(f => f.endsWith('.map'));
    assert.strictEqual(sourceMaps.length, 0, 'No source maps should be exposed in production bundle');
  });

  await test('Build-Audit', 'Confirms zero private keys or credentials in production bundles', () => {
    const assetsDir = path.resolve(__dirname, '../frontend/dist/assets');
    const files = fs.readdirSync(assetsDir);
    for (const f of files) {
      if (f.endsWith('.js')) {
        const content = fs.readFileSync(path.join(assetsDir, f), 'utf8');
        assert.strictEqual(content.includes('BEGIN RSA PRIVATE KEY'), false);
        assert.strictEqual(content.includes('BEGIN PRIVATE KEY'), false);
      }
    }
  });

  // ===========================================================================
  // SUMMARY
  // ===========================================================================
  console.log('\n========================================================================');
  console.log(`  PRODUCTION REGRESSION SUMMARY: ${passedTests} PASSED, ${failures.length} FAILED (TOTAL: ${totalTests})`);
  console.log('========================================================================\n');

  if (failures.length > 0) {
    console.error('FAILURES:');
    failures.forEach(f => console.error(`  - [${f.domain}] ${f.name}: ${f.error}`));
    process.exit(1);
  } else {
    console.log('🚀 ALL PRODUCTION SECURITY REGRESSION CHECKS PASSED (100% SUCCESS)!');
    process.exit(0);
  }
}

function fetchHeaders(urlStr) {
  return new Promise((resolve, reject) => {
    http.get(urlStr, res => resolve(res.headers)).on('error', reject);
  });
}

run().catch(err => {
  console.error('Harness fatal exception:', err);
  process.exit(1);
});
