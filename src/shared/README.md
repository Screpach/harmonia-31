# `src/shared` boundary contract

## Purpose

Small cross-cutting, framework-agnostic helpers and shared types.

## Allowed imports

- Other `src/shared/*` modules.

## Forbidden imports

- React/UI adapters.
- Rendering/audio/storage/state implementations.

## Notes

- Keep helpers generic and dependency-light.
- Boundary enforcement is currently social/documentation-based; consider future lint-based import constraints as a separate tracked task.
