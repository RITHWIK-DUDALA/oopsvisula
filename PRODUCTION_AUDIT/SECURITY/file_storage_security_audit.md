# OOPS LAB — File Storage & Upload Security Audit
**Audit Scope:** Section 10 (File Storage Security)  
**Date:** 2026-11-06  
**Auditor:** Principal Security Architect  
**Status:** **PASS — Path Traversal Defended & Size Limits Enforced**  

---

## 1. File Handling Verification

1. **Path Traversal Defense:**  
   Project imports and file uploads pass through strict basename filters:
   ```javascript
   const cleanName = path.basename(userFilename).replace(/[^A-Za-z0-9_.-]/g, '');
   ```
   Attack strings such as `../../../../etc/passwd` reduce to `passwd`.
2. **File Size Quota:**  
   Individual Java source files are capped at $64\text{ KB}$. Full workspace imports are capped at $2\text{ MB}$.
3. **MIME & Extension Enforcement:**  
   Only files ending with `.java` are processed into AST compilation pipelines. Executable extensions (`.exe`, `.sh`, `.bat`, `.jar`) are discarded upon import.

