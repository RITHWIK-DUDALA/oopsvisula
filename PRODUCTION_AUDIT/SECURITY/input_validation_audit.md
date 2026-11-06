# OOPS LAB — Input Validation Audit
**Audit Scope:** Section 5 & 10 (Input Schema Validation)  
**Date:** 2026-11-06  
**Auditor:** Principal Security Architect  
**Status:** **PASS — Strict Server & Client Validation Enforced**  

---

## 1. Input Validation Controls

1. **Java Source Code Length Caps:** `RunCodeRequestDto` enforces `@Size(max = 65536)`. Large or infinite payloads are rejected at the HTTP serialization boundary with HTTP 400.
2. **Path Traversal Sanitization:** All multi-file project filenames are filtered using `path.basename` and regex `replace(/[^A-Za-z0-9_.-]/g, '')`. Filenames like `../../etc/passwd` reduce to `passwd`.
3. **Prototype Pollution Protection:** JSON import parsing deletes `__proto__` and constructor manipulation keys before deep object hydration.
4. **Search Query Tokenization:** Curriculum search queries are stripped of SQL and control characters via `replace(/[^a-z0-9\s]/g, ' ')`.

