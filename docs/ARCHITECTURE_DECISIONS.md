# Architecture Decisions

Use this log for durable architecture choices.

## ADR Template

### ADR-XXXX: <short title>
- **Date:** YYYY-MM-DD
- **Status:** proposed | accepted | superseded
- **Context:**
  - Problem statement and constraints.
- **Decision:**
  - Chosen approach and boundary.
- **Consequences:**
  - Benefits, trade-offs, and migration notes.
- **Alternatives considered:**
  - Brief summary of rejected options.
- **Follow-ups:**
  - Tasks, owners, and checkpoints.

---

## ADR-0001: Domain core must be adapter-independent
- **Date:** 2026-05-05
- **Status:** accepted
- **Context:**
  - Harmonia 31 needs long-term maintainability across UI and audio changes.
  - Private rule data is deferred, so contracts must remain stable while adapters evolve.
- **Decision:**
  - Keep core domain models and rule evaluation logic independent from React/UI, rendering, audio, and persistence.
  - Integrate infrastructure only via explicit adapter interfaces.
- **Consequences:**
  - Easier testing and migration of front-end/audio stacks.
  - Slightly higher upfront interface design effort.
- **Alternatives considered:**
  - Embedding domain behavior directly in UI state stores (rejected due to coupling risk).
- **Follow-ups:**
  - Define initial domain and adapter package boundaries in a future micro-prompt.
