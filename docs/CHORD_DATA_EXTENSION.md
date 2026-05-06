# Chord Data Extension Plan

Date: 2026-05-06

## Purpose

Provide a typed home for chord-kind vocabulary while private rule packs are unavailable.

## Current state

- `ChordKind` model includes name, interval steps (31-EDO), inversions, aliases, and provenance.
- `SYNTHETIC_CHORD_KINDS` contains development-only seed items (major/minor triad) for architecture tests.
- Provenance explicitly marks seed entries as `synthetic-development-only`.

## How real data will be added later

1. Load validated chord-kind payload from an adapter boundary (CSV/JSON import adapter).
2. Parse and validate through `validateChordKinds`.
3. Preserve provenance with dataset identifiers and source mode.
4. Keep production/historical packs external to the repository until allowed.

## Guardrails

- Do not treat synthetic seed data as final musical corpus.
- Do not add private historical entries before authorized pack ingestion.
- Continue using `awaiting-private-rule-pack` for deferred integrations where applicable.
