# OOPS LAB — API Security Audit
**Audit Scope:** Section 5 (API Security)  
**Date:** 2026-11-06  
**Auditor:** Principal Security Architect  
**Status:** **PASS — Endpoints Hardened with Strict Schemas & CORS**  

---

## 1. API Inventory & Security Controls

| Endpoint | Method | Max Size | Input Validation | Error Response Policy | CORS Policy |
|---|:---:|:---:|---|---|---|
| **`/api/v1/execution/run`** | POST | $64\text{ KB}$ | `@Valid` `@NotBlank` `@Size(max=65536)` | Structured JSON DTO (No stack trace) | Whitelisted origins only (`localhost:5173`, `localhost:4173`) |
| **`/api/v1/execution/parse-ast`** | POST | $64\text{ KB}$ | `@Valid` `@Size(max=65536)` | Bad Request (400) on AST parse failure | Whitelisted origins only |
| **`/api/v1/execution/status/{id}`**| GET | URL Path | Strict UUID alphanumeric regex | 404 Not Found if missing | Whitelisted origins only |
| **`/api/health`** | GET | None | None | 200 `{ "status": "UP" }` | Public health check |

---

## 2. Hardening Invariants
1. **No Stack Traces:** Uncaught exceptions return sanitized error messages without exposing host paths or file structures.
2. **Method Restriction:** Non-whitelisted HTTP methods (e.g. `PUT`, `DELETE` on execution endpoints) are rejected with `405 Method Not Allowed`.

