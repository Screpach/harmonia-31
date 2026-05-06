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

## ADR-0002: Preserve enharmonic spelling identity as a domain invariant
- **Date:** 2026-05-06
- **Status:** accepted
- **Context:**
  - 31-EDO workflows require spelling-aware reasoning where enharmonic tokens are not interchangeable.
  - Beginner-facing tooling must make this behavior explicit so UI and engine code do not collapse spellings accidentally.
- **Decision:**
  - Treat spelled pitches (for example `C#` and `Db`) as distinct domain identities in all pitch-facing contracts.
  - Keep normalization and display concerns in adapters/UI layers, not in core pitch identity types.
- **Consequences:**
  - Improves correctness for voice-leading and analysis features in 31-EDO contexts.
  - Requires careful typing and conversion boundaries when interfacing with MIDI-like or frequency-only adapters.
- **Alternatives considered:**
  - Canonicalizing enharmonic spellings in the domain core (rejected because it erases required musical identity).
- **Follow-ups:**
  - Add explicit invariant tests for spelled-pitch identity in domain packages.
