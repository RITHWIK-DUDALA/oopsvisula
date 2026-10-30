# DISTRIBUTED RATE LIMITING SPECIFICATION — OOPS LAB
**Algorithm:** Token Bucket via Redis  
**Isolation:** Per Client IP / Anonymous Guest Session  

---

## 1. Rate Limiting Matrix

| Endpoint Route | Method | Burst Capacity | Refill Rate | Scope | Rejection Code |
|---|---|---|---|---|---|
| `/api/v1/execution/run` | POST | 10 tokens | 1 token / 2 seconds (30 req/min) | IP Address | `HTTP 429 Too Many Requests` |
| `/api/v1/execution/status/*` | GET | 60 tokens | 5 tokens / second (300 req/min) | IP Address | `HTTP 429 Too Many Requests` |
| `/api/v1/curriculum/*` | GET | 120 tokens | 10 tokens / second (600 req/min) | Global | `HTTP 429 Too Many Requests` |
| `/api/v1/health` | GET | 30 tokens | 1 token / second | Global | `HTTP 429 Too Many Requests` |

---

## 2. Rejection Response Payload

When a client breaches their token allocation, the gateway emits:

```json
{
  "status": "RATE_LIMIT_EXCEEDED",
  "error": "Too Many Requests",
  "message": "Execution rate limit reached. Maximum 30 runs per minute allowed per guest.",
  "retryAfterSeconds": 2
}
```

---

## 3. Sandboxed Worker Queue Autoscaling Thresholds

- **Scale Out:** If Redis `execution_queue` length > 25 for 10 consecutive seconds, launch +2 worker container replicas.
- **Scale In:** If queue length == 0 for 60 seconds, scale worker replicas down to baseline minimum (2 workers).
- **Hard Maximum:** 10 concurrent worker containers (capped at 2.5GB RAM, 10 virtual CPUs total).
