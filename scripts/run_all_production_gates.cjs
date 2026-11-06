/**
 * OOPS LAB — STAGE 10: MASTER PRODUCTION RELEASE GATES RUNNER
 * Conforms to Master Specification Section 12 (Stage 10 Automated Testing and CI/CD).
 * 
 * Chains and executes all verification suites:
 * 1. Stage 2: Functional QA Suite (33 suites)
 * 2. Stage 5: Security & Sandbox Penetration Suite (16 checks)
 * 3. Stage 6: Database & Data Consistency Suite (7 checks)
 * 4. Stage 7: Failure Injection & Recovery Suite (7 checks)
 * 5. Stage 8: Visual & Responsive Regression Suite (10 checks)
 * 6. Stage 9: Telemetry & Monitoring Suite (5 checks)
 * 7. Curriculum & Concepts Deep Regression (2,261 assertions)
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('========================================================================');
console.log('  OOPS LAB — STAGE 10: MASTER AUTOMATED CI/CD RELEASE GATES RUNNER       ');
console.log('========================================================================\n');

const gates = [
  { name: 'Gate 1: Stage 2 Functional QA Suite', script: 'scripts/run_stage2_functional_qa.cjs' },
  { name: 'Gate 2: Stage 5 Security & Sandbox Penetration', script: 'scripts/run_stage5_security_audit.cjs' },
  { name: 'Gate 3: Stage 6 Database & Consistency', script: 'scripts/run_stage6_database_consistency.cjs' },
  { name: 'Gate 4: Stage 7 Chaos Failure & Recovery', script: 'scripts/run_stage7_failure_recovery.cjs' },
  { name: 'Gate 5: Stage 8 Visual & Responsive Regression', script: 'scripts/run_stage8_visual_responsive.cjs' },
  { name: 'Gate 6: Stage 9 Monitoring & Telemetry Format', script: 'scripts/run_stage9_monitoring_telemetry.cjs' },
  { name: 'Gate 7: Curriculum & Concepts Deep Regression', script: 'scripts/verify_concepts_regression.cjs' }
];

let allPassed = true;
const summary = [];

for (const gate of gates) {
  process.stdout.write(`▶ Executing [${gate.name}]... `);
  const startTime = Date.now();
  try {
    execSync(`node "${path.resolve(__dirname, '..', gate.script)}"`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000
    });
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✓ PASSED (${elapsed}s)`);
    summary.push({ gate: gate.name, status: 'PASSED', duration: `${elapsed}s` });
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✗ FAILED (${elapsed}s)`);
    console.error(err.stderr ? err.stderr.toString() : err.message);
    summary.push({ gate: gate.name, status: 'FAILED', duration: `${elapsed}s` });
    allPassed = false;
  }
}

console.log('\n========================================================================');
console.log('  CI/CD PIPELINE VERIFICATION SUMMARY                                   ');
console.log('========================================================================');
for (const s of summary) {
  console.log(`  ${s.status === 'PASSED' ? '✓' : '✗'} ${s.gate.padEnd(52)} : ${s.status} (${s.duration})`);
}
console.log('========================================================================\n');

if (!allPassed) {
  console.error('🚫 CI/CD RELEASE BLOCKED: One or more critical production release gates failed.');
  process.exit(1);
} else {
  console.log('🚀 ALL 7 MANDATORY PRODUCTION GATES PASSED (100% SUCCESS) — RELEASE CERTIFIED!');
  process.exit(0);
}

