# OOPS LAB — Hardened Sandboxed Java 21 Execution Worker
# Conforms to docs/architecture/SECURITY_ARCHITECTURE.md
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /sandbox

# Create unprivileged student execution user
RUN addgroup -g 2000 studentgroup && \
    adduser -u 2000 -G studentgroup -s /bin/sh -D studentuser && \
    mkdir -p /sandbox/workspace && \
    chown -R studentuser:studentgroup /sandbox

USER studentuser
WORKDIR /sandbox/workspace

# Limits applied via docker-compose / container runner:
# - memory: 256m
# - cpus: 1.0
# - network: none
# - read-only root with tmpfs /sandbox/workspace

CMD ["sh"]
