# `src/engine` boundary contract

## Purpose

Deterministic rule evaluation, generation, and analysis mechanics over domain models.

## Allowed imports

- `src/domain/*`
- `src/shared/*`
- Other files inside `src/engine/*`

## Forbidden imports

- React/UI packages.
- `src/ui/*`, `src/render/*`, `src/audio/*`, `src/persistence/*`, `src/state/*`.
- Browser APIs and storage APIs.
- VexFlow, Tone.js, or similar adapter libraries.

## Notes

- Historical corpora integrations are deferred and should use placeholders tagged `awaiting-private-rule-pack`.
