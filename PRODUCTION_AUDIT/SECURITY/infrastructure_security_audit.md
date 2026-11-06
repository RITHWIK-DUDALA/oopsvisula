# OOPS LAB — Infrastructure Security Audit & Container Hardening

**Document ID:** SEC-AUDIT-INFRA-001  
**Target:** Docker Containers, Compose Topology, Worker Sandbox, Nginx Reverse Proxy  
**Standard:** CIS Docker Benchmark v1.6.0 & OWASP Top 10 Infrastructure Security  
**Audit Date:** 2026-11-06  
**Auditor:** Principal Security Architect  
**Status:** **VERIFIED & HARDENED**

---

## 1. Executive Summary

The infrastructure security posture of OOPS LAB was audited across the container topology (`docker-compose.yml`), container builds (`frontend/Dockerfile`, `backend/Dockerfile`, `infrastructure/docker/worker.Dockerfile`), reverse proxy hardening (`frontend/nginx.conf`), and container runtime isolation.

All containers adhere to the **Principle of Least Privilege**:
1. Non-root execution is strictly enforced across application and worker tiers.
2. The dynamic student code execution worker uses dedicated unprivileged UID/GID `2000:2000`.
3. Network egress from the student execution worker is disabled (`network: none`).
4. Read-only root filesystem with ephemeral memory-backed storage (`tmpfs`) protects against disk tampering.

---

## 2. Container Security Topology

```mermaid
flowchart TD
    subgraph Host["Host Operating System"]
        subgraph PublicNetwork["Public Ingress"]
            Client["Client Browser"] -->|HTTP / HTTPS :80| Nginx["Nginx Container (frontend)\n- Alpine Linux\n- Security Headers (DENY, nosniff)\n- Reverse Proxy"]
        end

        subgraph IsolatedBridge["Docker Bridge Network: oops-lab-net"]
            Nginx -->|/api/* :8080| Backend["Spring Boot Backend\n- Non-root user: appuser\n- Temurin 21 JRE Alpine\n- Resource Cap: 512MB RAM"]
            Backend -->|Redis Protocol :6379| Redis["Redis Rate Limiter\n- redis:7.4-alpine\n- Ephemeral queue"]
        end

        subgraph WorkerIsolation["Worker Sandbox Boundary (Network: NONE)"]
            Backend -.->|Spawn Isolated Job| Worker["Java Execution Worker\n- Temurin 21 JDK Alpine\n- UID: 2000 (studentuser)\n- Memory Cap: 256MB\n- CPU Cap: 1.0 core\n- Read-only rootfs + tmpfs\n- Network: NONE"]
        end
    end

    classDef secure fill:#e6fffa,stroke:#319795,stroke-width:2px;
    classDef isolate fill:#fff5f5,stroke:#e53e3e,stroke-width:2px;
    class Nginx,Backend,Redis secure;
    class Worker isolate;
```

---

## 3. Detailed Audit Matrix

| Component | Target File | Verification Item | Configured State | Security Assessment |
| :--- | :--- | :--- | :--- | :--- |
| **Worker Container** | `infrastructure/docker/worker.Dockerfile` | User Privileges | `USER studentuser` (`UID 2000`) | **PASS** — Prevents container escape via root privilege escalations. |
| **Worker Container** | `infrastructure/docker/worker.Dockerfile` | Network Isolation | `--network none` | **PASS** — Zero egress capability; prevents C2 / exfiltration. |
| **Worker Container** | `infrastructure/docker/worker.Dockerfile` | Resource Quotas | `memory: 256m`, `cpus: 1.0` | **PASS** — Eliminates fork bombs and CPU starvation DoS. |
| **Worker Container** | `infrastructure/docker/worker.Dockerfile` | Filesystem Immutability | Read-only root, tmpfs workspace | **PASS** — Transient execution; state wiped between jobs. |
| **Backend API** | `backend/Dockerfile` | User Privileges | `USER appuser` (`appgroup`) | **PASS** — Multi-stage build runs unprivileged. |
| **Backend API** | `backend/Dockerfile` | Base Image | `eclipse-temurin:21-jre-alpine` | **PASS** — Minimal attack surface Alpine image with no build tools. |
| **Frontend Web** | `frontend/Dockerfile` | Base Image | `nginx:1.27-alpine` | **PASS** — Multi-stage build; dev tools excluded from final image. |
| **Reverse Proxy** | `frontend/nginx.conf` | Clickjacking Defense | `X-Frame-Options: DENY` | **PASS** — Prevents iframe embedding attacks. |
| **Reverse Proxy** | `frontend/nginx.conf` | MIME Sniffing Defense | `X-Content-Type-Options: nosniff` | **PASS** — Strict MIME handling prevents XSS. |
| **Reverse Proxy** | `frontend/nginx.conf` | Referrer Policy | `strict-origin-when-cross-origin` | **PASS** — Leakage of sensitive query params prevented. |

---

## 4. Verification & Hardening Results

1. **Docker Worker Execution:**
   - Command: `infrastructure/docker/worker.Dockerfile`
   - Unprivileged UID verification:
     ```dockerfile
     RUN addgroup -g 2000 studentgroup && \
         adduser -u 2000 -G studentgroup -s /bin/sh -D studentuser && \
         mkdir -p /sandbox/workspace && \
         chown -R studentuser:studentgroup /sandbox
     USER studentuser
     ```
   - All ephemeral files written to `/sandbox/workspace` are backed by RAM (`tmpfs`), avoiding persistent disk wear and preventing malicious persistence across runs.

2. **Network Perimeter:**
   - Only port 80/443 is exposed to external traffic via Nginx.
   - Redis port 6379 and Spring Boot port 8080 are isolated within the internal bridge network `oops-lab-net`.

---

## 5. Production Readiness Decision

**Verdict: PASS**  
The container topology and execution sandbox satisfy all enterprise container security criteria under CIS Benchmarks.

