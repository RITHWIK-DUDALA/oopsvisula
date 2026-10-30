# SECURITY ARCHITECTURE & THREAT MODEL — OOPS LAB
**Scope:** Multi-Tenant Java Execution & API Defense  
**Threat Model:** Malicious / Errant Student Code Submissions  

---

## 1. Threat Identification & Mitigation Matrix

| Threat Category | Potential Attack Vector | Architectural Mitigation | Defense Layer |
|---|---|---|---|
| **Remote Code Execution (RCE)** | `Runtime.getRuntime().exec()`, `ProcessBuilder` | Static AST inspection via JavaParser blocks forbidden calls. Sandboxed execution worker runs as non-root user with `CLONE_NEWPID` / `no-new-privileges`. | Layer 1 (AST) & Layer 4 (Sandbox) |
| **Denial of Service (DoS - CPU)** | Infinite loops (`while(true)`) | Hard 5000ms wall-clock timeout enforced by worker watchdog. CPU core pinned to 1 vCPU. | Layer 3 (Watchdog) & Layer 4 (cgroups) |
| **Denial of Service (Memory)** | Memory explosion (`List<byte[]> list = new ArrayList<>()`) | Hard 256MB JVM heap cap (`-Xmx256m`) and 300MB container memory limit (`--memory=300m`). Kernel OOM killer terminates rogue containers safely. | Layer 4 (cgroups) |
| **Data Exfiltration** | Outbound HTTP requests (`HttpURLConnection`, `Socket`) | Container network interface completely disabled (`--network none`). No internet routing. | Layer 4 (Network namespace) |
| **Host Filesystem Mutation** | Overwriting system files (`/etc/passwd`, host disks) | Read-only container root (`--read-only`), ephemeral `/tmp` in tmpfs memory volume, no host volume mounts. | Layer 4 (Filesystem namespace) |
| **API Flooding / Scraping** | Rapid execution requests to exhaust workers | Distributed Redis token bucket rate limiting per anonymous IP with strict execution quotas (10 runs/min). | Layer 0 (Ingress / Nginx) |
| **Privilege Escalation** | Kernel container escape exploits | Hardened seccomp profiles, non-root user (UID 10001), drop all capabilities (`--cap-drop=ALL`). | Layer 4 (Linux capabilities) |

---

## 2. Multi-Layer Defense in Depth Model

```text
Incoming Student Submission
        │
[ Layer 0: Ingress Rate Limiting (Redis Token Bucket) ]
   Reject with HTTP 429 if > 10 runs/min/IP
        │
[ Layer 1: Static AST Analysis (JavaParser) ]
   Parse AST, inspect imports & calls; reject disallowed packages with HTTP 400
        │
[ Layer 2: Job Queue & Concurrency Capping (Redis Queue) ]
   Cap concurrent executions per user to prevent queue starvation
        │
[ Layer 3: Process Watchdog & Timers ]
   Enforce hard 5000ms execution timeout
        │
[ Layer 4: Hardened OS Sandbox (cgroups + namespaces) ]
   - cgroups: 256MB RAM, 1 CPU
   - namespaces: mount, pid, net, ipc, uts
   - capabilities: CAP_DROP_ALL
   - read-only rootfs + tmpfs /tmp
```

---

## 3. Privacy & Anonymous User Data Protection

1. **Zero Secret Logging:** Passwords, API tokens, and credentials are never stored in log files.
2. **Anonymous Identification:** Unauthenticated sessions are tracked via cryptographically hashed client tokens, avoiding persistent IP storage.
3. **Local State Ownership:** Learner code, practice solutions, and custom diagrams remain on the client in IndexedDB unless explicitly sent for execution.

