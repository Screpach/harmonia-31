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

7. **Hit-testing uses synthetic cell-space bounds**
   - Risk: current SATB selection mapping uses unit table-cell bounds, which may diverge from future pixel-precise notation engine geometry.
   - Mitigation: bind adapter hit targets to shared layout coordinates when richer SVG/canvas notation adapters are introduced.

8. **Keyboard note entry currently ignores ↑/↓ spellings**
   - Risk: one-step up/down key labels exist in the 31-EDO keyboard map, but the current note-entry loop intentionally no-ops those spellings.
   - Mitigation: introduce a domain-level accidental/micro-step representation or explicit spelling-to-pitch adapter contract before enabling those keys for entry.

9. **Diagnostic IDs use local deterministic hash only**
   - Risk: diagnostic IDs are stable per payload locally but are not guaranteed globally unique across tools/services.
   - Mitigation: adopt analyzer namespace prefixes or UUID-based IDs when cross-system diagnostic merging is introduced.

10. **Analysis currently runs separately in multiple UI components**
   - Risk: SatbGrid and Inspector each run analysis for the same project snapshot, which can duplicate compute and drift in future configuration changes.
   - Mitigation: centralize analysis execution behind a shared selector/store memo path with explicit plugin configuration.

11. **Deterministic ordering policy may need explicit versioning**
   - Risk: sorting by first location/severity/id is stable now but may produce unexpected order changes if location semantics expand.
   - Mitigation: version and test ordering policy explicitly before introducing multi-location prioritization or plugin weighting.

## Deferred private-data risks

1. **Historical rule corpus unavailable (`awaiting-private-rule-pack`)**
   - Impact: historically grounded SATB rule evaluation is intentionally deferred.
   - Why not blocking now: current phase focuses on reliable domain/state/interaction scaffolding.
   - Mitigation: keep extension points typed and source-agnostic until private pack is available.

2. **Adapter conformance to spelling semantics still pending**
   - Impact: notation/audio adapters could flatten enharmonic identity if not validated.
   - Why not blocking now: adapters remain scaffold-level and production integration is not wired.
   - Mitigation: require adapter conformance tests against spelled-pitch and schema contracts before adapter rollout.
