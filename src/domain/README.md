# `src/domain` boundary contract

## Purpose

Canonical musical truth and value types.

## Allowed imports

- `src/shared/*` (pure utilities/types only).
- Other files inside `src/domain/*`.

## Forbidden imports

- React/UI packages.
- `src/ui/*`, `src/render/*`, `src/audio/*`, `src/persistence/*`, `src/state/*`.
- Browser APIs (`window`, `document`, Web Audio, IndexedDB/localStorage).
- VexFlow, Tone.js, or any rendering/audio/storage framework.

## Notes

- Preserve 31-EDO spelled-pitch identity (`C#` and `Db` are distinct).
- Domain models must remain framework-agnostic and testable.
