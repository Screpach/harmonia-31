# Design System Foundation

## Intent

This repository uses original, lightweight design tokens inspired by frosted/glass interface principles without copying proprietary assets or branding.

## Token categories

Defined in `src/styles/tokens.css`:
- typography
- spacing
- border radius
- blur and shadow
- surfaces and borders
- focus ring and contrast-aware colors

## Accessibility foundations

- Visible focus treatment via shared focus-ring token and `:focus-visible` selectors.
- `prefers-reduced-motion: reduce` handling disables transitions/animations.
- `prefers-contrast: more` handling increases contrast and removes decorative blur/shadow.

## Theme strategy

- `ThemeProvider` currently applies a stable root class (`theme-light`).
- Future prompts can add additional modes without changing domain logic.

## Guardrails

- UI tokens and themes must not encode musical truth.
- 31-EDO pitch semantics remain domain-owned.
- Private historical rule corpus remains deferred (`awaiting-private-rule-pack`).
