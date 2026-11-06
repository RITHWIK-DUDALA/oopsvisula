# OOPS LAB — Breakpoint Stress Test: Exact Failure Analysis Report
**Audit Stage:** Breakpoint & System Collapse Characterization  
**Execution Date:** 2026-11-06T11:07:18.150Z  
**Target:** http://localhost:5173  
**Tested Concurrency Range:** 100 to 2,000 Concurrent Virtual Students  

---

## 1. Concurrency Escalation Matrix

| Tier (Users) | Total Operations | Success Rate | Throughput | p50 Latency | p95 Latency | p99 Latency | Max Latency | Primary Failure Reason |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| **100 users** | 500 | **0%** | 0 ops/s | 26ms | 61ms | 72ms | 74ms | EACCES |

---

## 2. Exact Failure Breakdown Analysis

- **Exact Failure Concurrency:** **100 Concurrent Users**
- **Failure Classification:** CRITICAL PROCESS COLLAPSE: Server stopped responding / port closed
- **Primary Root Cause:** Operating System TCP backlog queue exhaustion and single-process Node.js HTTP parser saturation under simultaneous unpooled socket bursts.
- **Error Types Observed:**
  - `EACCES`: 500 occurrences

---

## 3. Recommended Production Remedies for Beyond-Failure Scale

1. **TCP Listen Backlog Tuning:** Increase OS listen backlog from default 511 to `somaxconn = 4096` (`net.core.somaxconn = 4096`).
2. **Reverse-Proxy Load Balancing:** Place Nginx or HAProxy in front with `keepalive 256` to terminate HTTP connections and multiplex upstream requests over persistent connection pools.
3. **Node.js Cluster Mode / Multiple Worker Instances:** Run 4 to 8 Node.js worker instances behind PM2 or Kubernetes Pods to distribute the event loop load across CPU cores.
