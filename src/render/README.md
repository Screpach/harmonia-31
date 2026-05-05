# `src/render` boundary contract

## Purpose

Notation-like and visual rendering adapters.

## Allowed imports

- `src/domain/*` types
- `src/engine/*` outputs
- `src/shared/*`

## Forbidden imports

- Writing canonical musical truth that conflicts with `src/domain/*`.

## Notes

- Rendering may transform domain data for display, but may not redefine musical facts.
