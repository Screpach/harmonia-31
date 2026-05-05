# Known Risks

Updated: 2026-05-05

## Current integration baseline risks

1. **No domain model package yet**
   - Risk: architecture boundary can be violated accidentally when domain code begins.
   - Mitigation: next prompt should create explicit domain/adapters package structure and guardrails.

2. **Single smoke test only**
   - Risk: regressions may pass with limited test depth.
   - Mitigation: add unit tests for domain primitives and adapter contracts in subsequent prompts.

3. **Dependency vulnerability warnings**
   - Risk: `npm audit` reports moderate vulnerabilities in transitive dependencies.
   - Mitigation: review and remediate during dependency upgrade prompt; avoid forced major upgrades without compatibility checks.

4. **CI validated locally only in this environment**
   - Risk: GitHub-hosted run may reveal environment-specific issues.
   - Mitigation: verify Actions run after push using `docs/DEVELOPMENT_COMMANDS.md` procedure.

## Deferred private-data risks

1. **Historical rule corpus unavailable (`awaiting-private-rule-pack`)**
   - Impact: harmony-rule correctness cannot be historically validated yet.
   - Why not blocking now: current scope is scaffold, tooling, and documentation only.
   - Mitigation: keep strict extension points and synthetic fixture strategy until private pack arrives.

2. **Potential future mismatch between library assumptions and 31-EDO spelling**
   - Impact: UI/audio libraries may flatten enharmonic identity if unguarded.
   - Why not blocking now: no pitch processing logic is implemented yet.
   - Mitigation: enforce explicit spelled-pitch domain contracts before integrating notation/audio adapters.
