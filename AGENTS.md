# AGENTS Instructions for Harmonia 31

Scope: entire repository.

## Mission

Build and maintain a beginner-friendly, browser-first planning and implementation base for 31-EDO SATB harmony tooling.

## Hard constraints

1. **No private rule data yet**
   - Do not request private historical references or unpublished rule packs in normal implementation prompts.
   - Do not invent historical rule corpora.
   - If needed, create typed placeholders marked exactly: `awaiting-private-rule-pack`.

2. **31-EDO spelled pitch is first-class**
   - Preserve enharmonic spelling identity in all pitch-facing contracts.
   - Treat spellings like `C#` and `Db` as distinct identities in domain models.

3. **Architecture boundaries**
   - Domain logic must be independent of React/UI, rendering, audio engines, and storage.
   - Use adapter interfaces for IO concerns.

4. **Change discipline**
   - Keep diffs minimal and reviewable.
   - Preserve buildability and strict typing.
   - Do not weaken lint/type/test config to pass checks.

## Documentation expectations

- Update `docs/PROJECT_CHARTER.md` when goals or constraints change.
- Log architecture decisions in `docs/ARCHITECTURE_DECISIONS.md`.
- Keep `docs/ROADMAP_MICRO_PROMPTS.md` aligned with next small steps.
