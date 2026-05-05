# Known Risks

Updated: 2026-05-05

## Current integration baseline risks

1. **Command handlers currently soft-fail on missing IDs**
   - Risk: insert/delete/update may appear successful to callers even when target measure/event is absent.
   - Mitigation: add explicit command result envelopes (`applied`, `not-found`, `invalid`) in a follow-up prompt.

2. **History stores full project snapshots**
   - Risk: memory cost can grow quickly with long editing sessions.
   - Mitigation: evaluate structural sharing or inverse-operation history once command surface expands.

3. **Selection model is not score-validated yet**
   - Risk: selected measure/index/event sets may drift from actual score state during future edits.
   - Mitigation: add score-aware selection reconciliation when editing command orchestration is introduced.

4. **Keyboard shortcut matching is basic**
   - Risk: no modifier-aware bindings or platform-specific normalization yet.
   - Mitigation: add canonical shortcut parsing (Ctrl/Cmd/Alt/Shift) before complex interaction flows.

5. **Transitive vulnerability warnings remain**
   - Risk: `npm audit` reports moderate dependency vulnerabilities.
   - Mitigation: run a dedicated dependency maintenance prompt with compatibility regression checks.

6. **Hosted CI parity still requires post-push confirmation**
   - Risk: local green checks may diverge from GitHub-hosted environment behavior.
   - Mitigation: verify Actions run status after push using documented workflow.

## Deferred private-data risks

1. **Historical rule corpus unavailable (`awaiting-private-rule-pack`)**
   - Impact: historically grounded SATB rule evaluation is intentionally deferred.
   - Why not blocking now: current phase focuses on reliable domain/state/interaction scaffolding.
   - Mitigation: keep extension points typed and source-agnostic until private pack is available.

2. **Adapter conformance to spelling semantics still pending**
   - Impact: notation/audio adapters could flatten enharmonic identity if not validated.
   - Why not blocking now: adapters remain scaffold-level and production integration is not wired.
   - Mitigation: require adapter conformance tests against spelled-pitch and schema contracts before adapter rollout.
