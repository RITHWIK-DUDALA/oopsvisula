# OOPS LAB — Security Baseline & Initial State Report
**Audit Stage:** Stage B — Baseline Assessment  
**Date:** 2026-11-06  
**Auditor:** Principal Security Architect  

---

## 1. Initial Test & Build Baseline

Before implementing enhancements, all existing test suites were executed to verify system operational baseline:

- **Stage 2 Functional QA Suite (`scripts/run_stage2_functional_qa.cjs`):** 33 / 33 passed (100%).
- **Curriculum Deep Regression (`scripts/verify_concepts_regression.cjs`):** 2,261 / 2,261 passed (100%).
- **Frontend TypeScript Build (`tsc --noEmit`):** 0 errors.
- **Vite Production Build:** 3,268 modules compiled cleanly in 1m 6s.

---

## 2. Existing Security Controls & Gaps Analysis

| Domain | Existing Controls | Identified Security Gaps & Missing Controls |
|---|---|---|
| **Authentication** | Basic guest mode, email display name extraction in `authStore.ts` | **Missing:** Password complexity validation, brute-force rate limiting, session revocation, secure cookie flags (`HttpOnly`, `SameSite=Strict`). |
| **Authorization & Tenant Isolation** | Client-side tenant namespacing (`oops_lab_storage:student_xxx`) | **Missing:** Server-side token validation for protected operations, cryptographic HMAC signature for session export integrity. |
| **Java Sandbox Execution** | `AstSecurityValidator.java` checking forbidden package prefixes and methods | **Missing:** Hardening against `MethodHandles.lookup()`, `VarHandle`, `Thread.stop()`, strict source code size caps ($\le 128\text{ KB}$). |
| **Web Security (CSP / Headers)** | Standard Vite headers | **Missing:** Explicit Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. |
| **Input Validation** | Basic `@Valid` annotations on Spring DTOs | **Missing:** Request body size limit ($< 256\text{ KB}$), XSS sanitization helper on client-side entity labels, Path Traversal sanitizer on project uploads. |
| **Audit Logging** | Standard Spring Boot application logs | **Missing:** Structured security event logging with correlation IDs for authorization failures, rejected AST codes, and brute-force attempts. |

