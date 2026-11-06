# OOPS LAB TASK RECORD — OOPS-20261106-0300
# STAGE 1 — COMPLETE APPLICATION DISCOVERY & ARCHITECTURE INVENTORY

**Task ID:** OOPS-20261106-0300  
**Central ID:** SAI-01  
**Status:** COMPLETED  
**Date:** 2026-11-06 13:45:00  
**Role:** Principal Software Architect, Senior Backend Engineer, DevOps & Infrastructure Engineer  

---

## 1. Objectives & Scope

Execute Stage 1 of the Production Engineering, 200-User Load Testing, Security, and Release Certification program:
1. Thoroughly inspect repository files across frontend, backend, docker infrastructure, services, routes, stores, and test suites.
2. Catalog all 18 core dimensions: Frontend framework, Backend framework, API architecture, Authentication system, Database, Cache, Java compiler, Java execution workers, Execution sandbox, Queue system, WebSocket / SSE infrastructure, Hosting / Deployment, CDN / Ingress, Load balancer, CI/CD, Monitoring, Logging, and Automated tests.
3. Build a comprehensive system dependency map and identify architectural bottlenecks prior to load testing.
4. Author and publish `PRODUCTION_AUDIT/architecture_inventory.md`.

---

## 2. Key Findings & Architecture Summary

- **Dual-Engine Execution Model:**
  - **Client-Side Engine:** In-browser deterministic Java 21 Virtual Machine (`javaVirtualMachine.ts`, 88 KB) and AST Parser (`javaAstParser.ts`, 45 KB) generating CallStack snapshots, Eden Heap allocations, dynamic dispatch, and pointer tether vectors with zero server overhead.
  - **Server-Side Engine:** Spring Boot 3.3.4 (Java 21 LTS) REST API with JavaParser 3.26.1 for static AST security verification and containerized Docker execution workers (`infrastructure/docker/worker.Dockerfile`) running unprivileged (`studentuser`, uid 2000) with 256MB RAM cap, 1.0 CPU limit, read-only root, and no network access.
- **Client Route Tree:**
  - Public marketing: `/`
  - Application Shell (`/app/*`): `/concepts`, `/concepts/:conceptId`, `/playground`, `/visualizers`, `/practice`, `/roadmap`, `/progress`, `/reference`, `/settings`, `/help`, `/about`.
  - Protected Account Routes: `/app/dashboard`, `/app/profile` (guarded by `RequireAuth`).
- **Backend API Endpoints:**
  - `GET /api/v1/health`
  - `POST /api/v1/execution/parse-ast`
  - `POST /api/v1/execution/run`
  - `GET /api/v1/execution/status/{jobId}`
- **Identified Bottlenecks:**
  - `ExecutionService.java` unbounded `ConcurrentHashMap<String, ExecutionJob>` accumulating memory without TTL.
  - Status polling creating $O(N)$ HTTP request pressure under 200 concurrent users.
  - Headless browser automated sessions requiring independent LocalStorage context isolation.
  - Worker container pool needing queue throttling (10–25 concurrent worker slots).

---

## 3. Verification & Deliverables

- Created `PRODUCTION_AUDIT/architecture_inventory.md` with complete dependency diagrams and bottleneck analysis.
- Logged task in `MASTER_ACTIVITY_LOG.md` and `FILE_CHANGE_REGISTER.md`.
- Ready to proceed to **Stage 2 — Complete Functional Quality Assurance**.

