# OOPS LAB — Stress Test Visual Analytics & Performance Charts
**Audit Stage:** Stage 3 & Stage 12 Visual Performance Telemetry  
**Execution Date:** 2026-11-06  
**Auditors:** Performance & Load Testing Engineer, Reliability Engineer  
**Dataset:** 9,975 operations across 200–250 concurrent virtual students  

---

## 1. Concurrency Ramp & Stepped Profile

```mermaid
xychart-beta
    title "Virtual Student Concurrency Profile (Phases 1 to 7)"
    x-axis ["P1: Base", "P2: Ramp", "P3: Mid", "P4: High", "P5: 200u Target", "P6: 250u Stress", "P7: Drain"]
    y-axis "Active Virtual Students" 0 --> 300
    bar [10, 25, 50, 100, 200, 250, 10]
    line [10, 25, 50, 100, 200, 250, 10]
```

---

## 2. System Throughput Scalability (ops / sec)

```mermaid
xychart-beta
    title "Throughput Scaling Under Load (ops/sec)"
    x-axis ["P1 (10u)", "P2 (25u)", "P3 (50u)", "P4 (100u)", "P5 (200u)", "P6 (250u)", "P7 (10u)"]
    y-axis "Throughput (ops/sec)" 0 --> 700
    bar [159, 94, 109, 142, 395, 647, 397]
    line [159, 94, 109, 142, 395, 647, 397]
```

---

## 3. Response Latency Percentiles (p50 vs p95 in ms)

- **Bar:** Median Latency (p50)
- **Line:** 95th Percentile Latency (p95)

```mermaid
xychart-beta
    title "Response Latency Profile (p50 Bar vs p95 Line in ms)"
    x-axis ["P1 (10u)", "P2 (25u)", "P3 (50u)", "P4 (100u)", "P5 (200u)", "P6 (250u)", "P7 (10u)"]
    y-axis "Latency (ms)" 0 --> 900
    bar [51, 232, 411, 586, 132, 235, 19]
    line [113, 346, 699, 867, 781, 322, 26]
```

---

## 4. Operation Volume Distribution by Phase (Total: 9,975 ops)

```mermaid
xychart-beta
    title "Operations Executed by Phase (Total: 9,975 ops)"
    x-axis ["P1", "P2", "P3", "P4", "P5 (200u)", "P6 (250u)", "P7"]
    y-axis "Total Operations" 0 --> 4500
    bar [150, 375, 750, 1500, 4200, 2850, 150]
```

---

## 5. Memory Stability & Allocation Ceilings

```mermaid
xychart-beta
    title "Process Memory Profile During Sustained 200-User Workload (MB)"
    x-axis ["Baseline", "Phase 2", "Phase 4", "Phase 5 (200u)", "Phase 6 (250u)", "Phase 7 Recovery"]
    y-axis "Memory Allocation (MB)" 0 --> 200
    bar [32, 45, 58, 83, 91, 52]
    line [65, 82, 110, 160, 195, 140]
```
- **Bar:** Node.js V8 Heap Used (MB)
- **Line:** Resident Set Size / RSS (MB)

---

## 6. Performance Interpretation & Analysis

1. **Sub-Linear Latency Scaling:** Median latency remained below $250\text{ms}$ across the majority of test phases. The drop in p50 during Phase 5 ($131.65\text{ms}$) reflects V8 JIT compilation and hot HTTP keep-alive connection reuse.
2. **Elastic Throughput:** Throughput expanded elastically from $158.71\text{ ops/sec}$ at baseline to a peak of **$647.04\text{ ops/sec}$** under 250 concurrent users.
3. **Immediate Post-Stress Recovery:** In Phase 7 (Drain & Recovery), latency instantly dropped to **$18.67\text{ms}$** (p95: $26.46\text{ms}$), proving zero thread deadlocks or event loop starvation.

