# OOPS LAB — Java Playground Sandbox & Execution Boundary Audit
**Audit Scope:** Section 6 (Java Playground Execution Security Boundary)  
**Date:** 2026-11-06  
**Auditor:** Principal Security Architect  
**Status:** **PASS — Hardened Multi-Layer Sandbox Verified**  

---

## 1. Sandbox Hardening Matrix

| Security Threat | Attack Code Sample | Defense Mechanism | Test Status |
|---|---|---|:---:|
| **Reflection Introspection** | `Method m = Class.forName("java.lang.Runtime")` | Blocked by `AstSecurityValidator` package prefix | **BLOCKED** |
| **MethodHandles Bypass** | `MethodHandles.lookup().findStatic(...)` | Blocked in Java & TS static analyzers | **BLOCKED** |
| **Shell Process Spawning** | `new ProcessBuilder("sh").start()` | Blocked by method blacklist & `--cap-drop=ALL` | **BLOCKED** |
| **Host JVM Termination** | `System.exit(0)`, `Runtime.halt(1)` | Blocked by static analyzer before compilation | **BLOCKED** |
| **Thread Denial of Service** | `Thread.currentThread().stop()` | Blocked by static analyzer | **BLOCKED** |
| **Filesystem Mutation** | `new java.io.File("/etc/shadow")` | Blocked by package prefix & read-only container root | **BLOCKED** |
| **Network Egress** | `new java.net.Socket("10.0.0.1", 8080)` | Blocked by package prefix & `--network none` | **BLOCKED** |
| **Infinite Loop / CPU DoS** | `while(true) {}` | Enforced 1,000-step loop execution quota | **CAPPED** |
| **Memory Exhaustion** | 1,000,000 object allocations in loop | Enforced 500-instance Eden heap allocation ceiling | **CAPPED** |

---

## 2. Container Isolation Invariants (`infrastructure/docker/worker.Dockerfile`)

1. **Non-Root Runtime:** Executes as unprivileged user `studentuser` (UID 2000, GID 2000).
2. **Network Disabled:** `--network none` removes all network adapters except loopback.
3. **Read-Only Root Filesystem:** Root directory is read-only; only ephemeral `/sandbox/workspace` is mounted as tmpfs with strict size limits.
4. **Watchdog Timeout:** Hard 5,000ms wall-clock timeout kills runaway processes cleanly.

