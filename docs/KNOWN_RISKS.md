# Known Risks

Updated: 2026-05-05

## Current integration baseline risks

1. **Schema migration registry is intentionally minimal**
   - Risk: future schema increments may be added without explicit migration tests if process discipline slips.
   - Mitigation: require migration-test additions for every schemaVersion change.

2. **Score model lacks edit-time invariants**
   - Risk: invalid measure filling, overlap, or voice assignment patterns can be constructed by future code.
   - Mitigation: add command-layer validators before introducing score editing operations.

3. **Voice range defaults are placeholder-only**
   - Risk: defaults may be misread as normative historical constraints.
   - Mitigation: keep explicit non-historical labeling and require configurable range profiles.

4. **Duration arithmetic uses number-backed integers**
   - Risk: extremely large rational values could exceed safe integer bounds.
   - Mitigation: evaluate bigint-backed rational variant if large-value workflows appear.

5. **Transitive vulnerability warnings remain**
   - Risk: `npm audit` reports moderate dependency vulnerabilities.
   - Mitigation: run a dedicated dependency maintenance prompt with compatibility regression checks.

6. **Hosted CI parity still requires post-push confirmation**
   - Risk: local green checks may diverge from GitHub-hosted environment results.
   - Mitigation: verify Actions run status after push using documented workflow.

## Deferred private-data risks

1. **Historical rule corpus unavailable (`awaiting-private-rule-pack`)**
   - Impact: historically grounded SATB rule evaluation is intentionally deferred.
   - Why not blocking now: current phase focuses on type-safe domain/data foundations and scaffold integrity.
   - Mitigation: keep extension points typed and source-agnostic until private pack is available.

2. **Adapter conformance to spelling semantics still pending**
   - Impact: notation/audio adapters could accidentally flatten enharmonic identity.
   - Why not blocking now: adapter integrations remain scaffold-level and no production adapter is wired.
   - Mitigation: require adapter tests against spelled-pitch and schema contracts before integration.
