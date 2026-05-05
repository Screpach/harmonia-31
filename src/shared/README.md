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
- TODO: enforce these boundaries with ESLint import rules in a later prompt.
