# Deployment Notes (Preview-Oriented)

This project is currently prepared for preview deployment and iterative online testing.

## Build output

- Build command: `npm run build`
- Output directory: `dist/`

## Static hosting targets

Any static host that serves `dist/` can be used (for example Vercel, Netlify, GitHub Pages via workflow, or Cloudflare Pages).

## Vercel (example)

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

## Environment and secrets

- No secrets are required for current scaffold preview.
- Do not add private rule-pack data or credentials to client-side bundle.

## Post-deploy smoke checks

1. App shell renders and keyboard navigation works.
2. Synthetic example picker loads projects.
3. Export/import JSON controls function in browser.
4. Transport controls do not autoplay audio on page load.
