# Notation Engine Decision (Adapter Spike)

Date: 2026-05-05

## Current decision

- Keep `simpleGridAdapter` as the active notation adapter for the browser workspace.
- Defer integration of VexFlow/OSMD until additional requirements and private-rule data are available (`awaiting-private-rule-pack`).
- Use a stable `NotationAdapter` boundary so future engines can map domain/layout data into render-ready view models without changing domain contracts.

## Why this decision now

- The current prompt is an adapter spike, not an engine migration.
- We must preserve 31-EDO spelled-pitch identity (`C#` and `Db` remain distinct) while avoiding premature rendering complexity.
- The grid adapter is small, testable, and beginner-maintainable.

## Risks

- Grid rendering is intentionally limited and not a final engraving UX.
- Future engine migration may require additional adapter outputs (glyph metadata, collision hints, cursor anchors).
- VexFlow/OSMD may impose 12-EDO assumptions that require explicit adaptation.

## Exit criteria for next notation-engine phase

- Adapter contract remains stable while adding at least one second engine adapter prototype.
- Proof tests show enharmonic spelling identity is preserved end-to-end.
- Decision log compares complexity, accessibility, and maintainability before engine switch.
