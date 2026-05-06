# Beginner Online Workflow

This guide is for running Harmonia 31 entirely online (no local editor required).

## Option A: GitHub + Codespaces (recommended)

1. Fork this repository on GitHub.
2. Open your fork and click **Code → Codespaces → Create codespace on main**.
3. In the Codespace terminal run:
   - `npm ci`
   - `npm run dev -- --host 0.0.0.0 --port 4173`
4. Open the forwarded port (4173) in your browser tab.
5. Use the UI tools panel to:
   - load a **Synthetic Example**,
   - try **Export JSON**,
   - try **Import JSON**.

## Option B: GitHub + Codex editing loop

1. Create a branch for your prompt-based change.
2. Keep changes small and focused.
3. Run verification commands before committing:
   - `npm run typecheck`
   - `npm run lint`
   - `npm test`
   - `npm run build`

## First checks in fresh browser context

- Confirm app shell heading appears: **Harmonia 31**.
- Tab through transport, file controls, and synthetic example picker.
- Verify no audio starts automatically before explicit Play action.

## Important constraints

- Current examples and generation logic are synthetic.
- Historical/private rule packs remain deferred as `awaiting-private-rule-pack`.
