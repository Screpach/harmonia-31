# `src/state` boundary contract

## Purpose

Application state orchestration and UI-facing state transitions.

## Allowed imports

- `src/domain/*` types
- `src/engine/*` pure operations
- `src/shared/*`

## Forbidden imports

- Embedding canonical musical truth directly in UI state containers.

## Notes

- State stores orchestrate data flow but should not replace domain invariants.
