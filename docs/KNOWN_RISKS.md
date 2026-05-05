# Known Risks

Updated: 2026-05-05

## Current integration baseline risks

1. **No implemented domain model yet**
   - Risk: architecture boundary could be eroded when feature work begins.
   - Mitigation: next prompts should introduce explicit domain primitives before complex UI features.

2. **UI settings store is intentionally minimal**
   - Risk: contributors may start placing score or musical truth into `src/state/*`.
   - Mitigation: enforce state-boundary lint rules and add code-review checks for domain ownership.

3. **Smoke-heavy test mix**
   - Risk: high-level rendering checks may miss deeper regressions.
   - Mitigation: add focused unit tests for domain primitives, adapter contracts, and selector/action invariants.

4. **Dependency vulnerability warnings**
   - Risk: `npm audit` still reports moderate transitive vulnerabilities.
   - Mitigation: schedule targeted dependency maintenance prompt; avoid forcing major upgrades blindly.

5. **Local CI parity not yet proven on hosted runners**
   - Risk: GitHub-hosted runs can surface environment differences.
   - Mitigation: verify Actions results after push via `docs/DEVELOPMENT_COMMANDS.md` workflow.

## Deferred private-data risks

1. **Historical rule corpus unavailable (`awaiting-private-rule-pack`)**
   - Impact: historically faithful harmony validation cannot be implemented yet.
   - Why not blocking now: current work is infrastructure, shell UI, and settings scaffolding only.
   - Mitigation: continue typed extension points and synthetic fixture strategy until private pack arrives.

2. **Potential library mismatch with 31-EDO spelling semantics**
   - Impact: notation/audio adapters may flatten enharmonic identity if not guarded.
   - Why not blocking now: no pitch computation/notation/audio rule engine has been integrated yet.
   - Mitigation: add explicit spelled-pitch domain primitives and adapter conformance tests before integration.
