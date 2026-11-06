# OOPS LAB — Business Logic & Anti-Tampering Security Audit

**Document ID:** SEC-AUDIT-BIZ-001  
**Scope:** Curriculum Progression, Challenge Evaluation, Execution Quotas, Workspace Persistence  
**Standard:** OWASP Business Logic Testing Guide, CWE-840 (Business Logic Errors)  
**Audit Date:** 2026-11-06  
**Auditor:** Principal Security Architect  
**Status:** **VERIFIED & PROTECTED**

---

## 1. Executive Summary

Business logic vulnerabilities occur when flaws in application workflows allow users to bypass business rules, manipulate state, or abuse system privileges without triggering traditional technical exploits.

The business logic of OOPS LAB was audited for:
1. **Curriculum & Challenge Completion Integrity:** Preventing fake milestone completion.
2. **Execution Quotas & Resource Consumption:** Enforcing limits on AST parsing, memory allocation, and run requests.
3. **Workspace State Integrity:** Preventing state injection or workspace corruption on import/export.
4. **Anti-Replay & Transactional Consistency:** Ensuring deterministic execution states.

---

## 2. Threat & Mitigation Analysis

### 2.1 Challenge Completion & Auto-Grading Integrity
- **Risk:** A student client submits fabricated "completed" status for curriculum modules without satisfying code constraints or running valid AST assertions.
- **Controls & Mitigation:**
  - In local-first / guest mode, progression is stored in local browser state. Progression unlock is verified via deterministic AST assertion checks (`javaAstParser.ts`).
  - When backend grading is active, `ExecutionController` processes the full Java source through `AstSecurityValidator` and `AstAnalysisService`, verifying that required class structures, inheritance hierarchies, and method signatures are genuinely present before returning an achievement grant.
  - Client-side bypasses cannot corrupt or elevate privileges across other student accounts.

### 2.2 Execution Flooding & Worker Denial of Service
- **Risk:** Malicious loops or recursive object instantiations designed to exhaust heap memory or thread pools.
- **Controls & Mitigation:**
  - **AST Pre-Filter:** Blocks endless thread spawning (`new Thread(...)`, `Executors.new*`).
  - **Timeout Clamps:** Execution timeout strictly capped at 2.5 seconds (2,500ms).
  - **Memory Limits:** Dynamic worker memory hard-capped at 256MB.
  - **Step Limit:** Virtual Machine simulation enforces a hard maximum of 5,000 steps per trace, terminating execution with an explicit `MAX_STEPS_EXCEEDED` event.

### 2.3 Workspace Import / Export Anti-Tampering
- **Risk:** A student imports a malicious JSON workspace payload containing prototype pollution or oversized file trees.
- **Controls & Mitigation:**
  - Sanitization parser strips `__proto__`, `constructor`, and `prototype` keys prior to object assignment.
  - Individual source file length capped at 64 KB; total project size capped at 1 MB.
  - Validates that project files are valid Java identifiers and strictly strips directory traversal sequences (`../`, `..\\`).

---

## 3. Verification Matrix

| Workflow | Invariant Tested | Test Case | Result |
| :--- | :--- | :--- | :--- |
| **AST Assertion Engine** | Structural validation required | Code without required inheritance rejected | **PASS** |
| **Execution VM Engine** | Max steps bound (5,000) | `while(true) { i++; }` safely aborted | **PASS** |
| **Rate Limiter** | 5 failed attempts = 30s lockout | 5 incorrect login submissions locked | **PASS** |
| **Project Importer** | Prototype pollution immunity | `{"__proto__": {"isAdmin": true}}` sanitized | **PASS** |
| **Storage Bounds** | Max quota enforcement | Inputs > 64KB rejected with 413 Payload Too Large | **PASS** |

---

## 4. Production Readiness Decision

**Verdict: PASS**  
Application business logic enforces strict boundary bounds, validates state transitions deterministically, and provides defense-in-depth against resource abuse.

