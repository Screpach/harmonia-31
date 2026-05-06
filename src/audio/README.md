# `src/audio` boundary contract

## Purpose

Playback and scheduling adapters.

## Allowed imports

- `src/domain/*` types
- `src/engine/*` outputs
- `src/shared/*`

## Forbidden imports

- Writing canonical musical truth.
- Creating hidden tuning logic that bypasses domain/engine contracts.

## Notes

- Audio implementation details (Web Audio, Tone.js, etc.) remain adapter concerns.
