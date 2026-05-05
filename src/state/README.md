# `src/state` boundary contract

## Purpose

Application state orchestration for UI settings and interaction flow.

## Current scope

- `useAppStore` contains **UI settings only**:
  - active voice placeholder,
  - theme mode,
  - inspector visibility,
  - tempo placeholder.
- No score/project/music-theory truth is stored here yet.

## Allowed imports

- `src/domain/*` types (when needed)
- `src/engine/*` pure operations
- `src/shared/*`

## Forbidden imports

- Embedding canonical musical truth directly in state.
- Persistence side effects as default behavior (refresh persistence is not promised yet).

## Notes

- Store currently has no browser-storage dependency by design.
- Private-rule ingestion remains deferred: `awaiting-private-rule-pack`.
