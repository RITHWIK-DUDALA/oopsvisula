# OOPS LAB — Attack Surface Inventory
**Audit Stage:** Stage A — Attack Surface Mapping  
**Date:** 2026-11-06  
**Auditor:** Principal Security Architect  

---

## 1. External Attack Surface Matrix

| Interface / Endpoint | Protocol / Method | Public / Auth | Input Parameters | Attack Vectors | Existing Controls |
|---|:---:|:---:|---|---|---|
| **`/api/v1/execution/run`** | HTTP POST | Public / Guest | `sourceCode` (String) | RCE, JVM crash, infinite loop, memory DoS, disk write | `AstSecurityValidator`, 5s watchdog |
| **`/api/v1/execution/parse-ast`** | HTTP POST | Public / Guest | `sourceCode` (String) | CPU DoS via deep AST recursion, regex ReDoS | `JavaParser` static analysis |
| **`/api/v1/execution/status/{id}`**| HTTP GET | Public / Guest | `jobId` in path | IDOR, timing attacks, job enumeration | Random UUID `job-xxxxxxxx` |
| **`/api/health`** | HTTP GET | Public | None | Information disclosure | Minimal health response |
| **Monaco Java Editor** | Client DOM | Client | Typed user text | DOM XSS via tooltip / inspect popover | React JSX escaping |
| **Visualizer Canvas** | SVG / Canvas | Client | AST parsed nodes/values | SVG script injection via node label | Sanitized text nodes |
| **Session JSON Import** | File Import | Client | JSON text payload | Prototype pollution, malformed JSON DoS | Schema validation, `__proto__` strip |
| **Multi-File Workspace** | File Store | Client | Filenames, file contents | Path traversal (`../../etc/passwd`) | `path.basename` sanitization |

---

## 2. Risk Categorization (STRIDE Model)

- **Spoofing:** Guest identity impersonation; cross-tenant session token theft.
- **Tampering:** Malicious manipulation of serialized local storage keys or AST payloads.
- **Repudiation:** Insufficient security audit logging of execution rejection events.
- **Information Disclosure:** Memory address inspection, leak of host paths or stack traces.
- **Denial of Service:** Infinite CPU loops (`while(true)`), JVM heap explosion (`-Xmx256m`), fork bombs.
- **Elevation of Privilege:** Container breakout via Linux capabilities or mount namespace escapes.

