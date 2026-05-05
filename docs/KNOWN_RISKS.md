# Known Risks

Updated: 2026-05-05

## Current integration baseline risks

1. **Accidental semantics need broader formalization**
   - Risk: current accidental integer handling is consistent but intentionally minimal for early primitives.
   - Mitigation: introduce explicit accidental policy docs and tests before advanced notation ingestion.

2. **Interval quality classification is intentionally partial**
   - Risk: consumers may expect full historical/theoretical quality naming too early.
   - Mitigation: keep `quality: 'unknown'` contract explicit until rule-backed quality logic is introduced.

3. **UI settings store must remain non-domain**
   - Risk: future prompts may accidentally place score/musical truth into `src/state/*`.
   - Mitigation: add import/boundary lint rules and code-review checklist items for state-domain separation.

4. **Transitive vulnerability warnings persist**
   - Risk: `npm audit` reports moderate vulnerabilities in dependency tree.
   - Mitigation: run a dedicated dependency maintenance prompt with controlled upgrades and regression checks.

5. **Hosted CI parity still pending post-push verification**
   - Risk: local-successful checks may differ from GitHub-hosted environment behavior.
   - Mitigation: verify Actions run results after push via documented workflow.

## Deferred private-data risks

1. **Historical rule corpus unavailable (`awaiting-private-rule-pack`)**
   - Impact: historically grounded SATB constraints remain unavailable by design.
   - Why not blocking now: current milestone is stable domain foundation and scaffold integrity.
   - Mitigation: continue typed extension points and synthetic fixtures until private pack is available.

2. **Future adapter mismatch with 31-EDO spelling semantics**
   - Impact: rendering/audio adapters could flatten enharmonic identity if integration is careless.
   - Why not blocking now: adapters are scaffolding-level; domain tests already enforce spelling distinctions.
   - Mitigation: require adapter conformance tests against domain spelling contracts before integration.
