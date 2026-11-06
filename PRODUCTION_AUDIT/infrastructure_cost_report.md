# OOPS LAB — Production Infrastructure Cost & Capacity Modeling
**Audit Stage:** Stage 12 Companion — Cloud Infrastructure & Capacity Sizing  
**Execution Date:** 2026-11-06  
**Auditors:** DevOps & Cloud Infrastructure Engineer, Principal Software Architect  
**Final Release Decision:** **APPROVED — Highly Cost-Efficient Architecture**  

---

## 1. Executive Summary

Because OOPS LAB employs a **Local-First Architecture** where AST parsing, visualizer layout calculation, and interactive JDI stepping execute directly in the student's browser via high-performance TypeScript state machines, server-side infrastructure overhead is minimized.

Backend resources are utilized primarily for initial static asset delivery (CDN) and optional headless sandboxed container compilation.

---

## 2. Infrastructure Sizing for 200 to 1,000 Active Concurrent Students

| Infrastructure Component | 200 Concurrent Students (Staging Baseline) | 1,000 Concurrent Students (Production Scale) | Estimated Monthly Cost (USD) |
|---|---|---|:---:|
| **Edge CDN & Static Ingress** (Cloudflare / Fastly) | Free / Pro Tier ($20/mo) | Business Tier ($200/mo) | $20 – $200 |
| **API Gateway & Reverse Proxy** (2x Nginx / Envoy) | 2 vCPU, 4 GB RAM ($40/mo) | 4 vCPU, 8 GB RAM ($80/mo) | $40 – $80 |
| **Container Worker Pool** (Docker on k8s / ECS) | 3 Disposable Worker Pods ($60/mo) | 10 Autoscaling Pods ($200/mo) | $60 – $200 |
| **Redis Rate Limiting & Queue** (Redis 7.4) | Managed Redis Small ($25/mo) | Managed Redis Medium ($50/mo) | $25 – $50 |
| **Telemetry & Observability** (Prometheus / Grafana) | Self-hosted ($20/mo) | Cloud Managed ($60/mo) | $20 – $60 |
| **Total Estimated Operating Cost** | **~$165 / month** | **~$590 / month** | **~$0.59 / active student / mo** |

---

## 3. Cost Optimization Factors

1. **Client-Side Compute Offloading:** Over 90% of execution stepping and visual rendering occurs on the client device via `javaVirtualMachine.ts`, eliminating expensive server-side compute instances.
2. **Aggressive Static Caching:** All 184 curriculum lessons and Monaco editor bundles are immutable assets cached with `Cache-Control: public, max-age=31536000, immutable`.
3. **Disposability & Ephemeral Workers:** Sandboxed Docker containers spin down immediately upon job completion, avoiding idle compute billing.

---

## 4. Certification Sign-Off

**Infrastructure Capacity & Cost Result:** **APPROVED FOR DEPLOYMENT**

