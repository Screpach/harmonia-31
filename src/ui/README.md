# `src/ui` boundary contract

## Purpose

React components and interaction surfaces.

## Allowed imports

- `src/domain/*` types
- `src/engine/*` outputs
- `src/state/*`
- `src/shared/*`

## Forbidden imports

- UI-owned musical truth that conflicts with domain contracts.

## Notes

- UI may present, edit, and route data, but domain/engine own musical correctness.
