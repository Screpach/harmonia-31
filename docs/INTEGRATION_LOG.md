# Integration Log

## 2026-05-05 — Integration Gate 01 (Prompts 01-04)

### Scope audited
- Repository charter and agent guidance docs.
- Open-source reconnaissance and review template docs.
- Vite + React + TypeScript scaffold.
- Quality scripts and CI workflow.
- Beginner workflow documentation.

### Checks run
- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview` and local HTTP request.

### Result
- All automated checks passed.
- App preview shell serves successfully with "Harmonia 31" title and root mount.
- No new product feature scope added in this integration gate.

### Repairs made
- No code or contract repairs required in this gate.
- Added integration documentation to establish a stable baseline for next prompts.

### Contract integrity notes
- No pitch-domain logic exists yet; no contract changes were introduced.
- Deferred private corpus policy remains intact (`awaiting-private-rule-pack`).

## 2026-05-05 — Integration Gate 02 (Prompts 06-09)

### Scope audited
- Source-tree boundary contracts (`src/*/README.md`).
- One-screen app shell layout regions and semantics.
- Design tokens and accessibility foundation.
- UI-only global state skeleton (`zustand`).

### Checks run
- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview` and local HTTP request.

### Result
- All automated checks passed.
- Preview shell still serves successfully with Harmonia 31 title and root mount.
- No new product feature scope added in this integration gate.

### Repairs made
- No contract or code repairs were required.
- Added this gate log entry and refreshed known-risk tracking.

### Contract integrity notes
- State layer remains UI-settings-only; no score or musical truth added to state.
- Deferred private corpus policy remains intact (`awaiting-private-rule-pack`).
- 31-EDO spelled-pitch identity constraints remain documented in domain boundaries.

## 2026-05-05 — Integration Gate 03 (Prompts 11-14)

### Scope audited
- 31-EDO constants and immutable keyboard mapping.
- SpelledPitch identity, validation, parser, and formatter behavior.
- Reference tuning and frequency conversion primitives.
- Interval primitives (directed EDO steps, generic number, named interval structure).

### Checks run
- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview` and local HTTP request.

### Result
- All automated checks passed.
- Preview shell still serves successfully with Harmonia 31 title and root mount.
- No new product feature scope added in this integration gate.

### Repairs made
- No contract or code repairs were required.
- Added this gate entry and refreshed known-risk tracking for domain foundations.

### Contract integrity notes
- Spelled-pitch identity remains first-class (`C#` and `Db` preserved as distinct spellings).
- Frequency and interval primitives remain pure domain logic with no UI/audio adapter dependencies.
- Deferred private corpus policy remains intact (`awaiting-private-rule-pack`).

## 2026-05-05 — Integration Gate 04 (Prompts 16-19)

### Scope audited
- SATB voice and range model defaults/check behavior.
- Rational duration math normalization and operations.
- Score entity model (Project/Score/Measure/Event) and empty project factory.
- Runtime schema validation and migration skeleton for native project JSON.

### Checks run
- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview` and local HTTP request.

### Result
- All automated checks passed.
- Preview shell still serves successfully with Harmonia 31 title and root mount.
- No new product feature scope added in this integration gate.

### Repairs made
- No contract or code repairs were required.
- Added this gate entry and refreshed risk tracking for data-integrity foundations.

### Contract integrity notes
- Spelled-pitch identity remains explicit and non-collapsed in domain contracts/tests.
- Project schema validation and migration hooks are runtime-safe and version-gated.
- Deferred private corpus policy remains intact (`awaiting-private-rule-pack`).

## 2026-05-05 — Integration Gate 05 (Prompts 21-24)

### Scope audited
- Command pattern foundation and history behavior.
- Note insert/delete/update command handlers.
- Selection model and reducer integration with app store.
- Keyboard shortcut registry/hook and interaction safety rules.

### Checks run
- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview` and local HTTP request.

### Result
- All automated checks passed.
- Preview shell still serves successfully with Harmonia 31 title and root mount.
- No new product feature scope added in this integration gate.

### Repairs made
- Repaired shortcut editable-target guard so non-editable elements deterministically return `false`.
- Added this gate entry and refreshed risks for interaction-layer readiness.

### Contract integrity notes
- Spelled-pitch identity remains explicit through note update command tests (`C#` vs `Db` not collapsed automatically).
- Command handlers remain pure data transforms with no React/audio/render dependencies.
- Deferred private corpus policy remains intact (`awaiting-private-rule-pack`).

## 2026-05-05 — Integration Gate 06 (Prompts 26-29)

### Scope audited
- Layout contracts and score layout coordinate outputs.
- Simple SATB renderer (`SatbGrid`) and notation adapter boundary (`NotationAdapter` + `simpleGridAdapter`).
- Renderer-neutral hit testing (`hitTest`) and selected-state highlighting (`SelectionOverlay`).

### Checks run
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview -- --host 127.0.0.1 --port 4173` and local HTTP request.

### Result
- All automated checks passed.
- Preview shell still serves successfully and app root loads.
- No new product feature scope added in this integration gate.

### Repairs made
- No code or contract repairs were required during this gate.
- Added this gate entry and refreshed risk tracking for rendering/selection integration.

### Contract integrity notes
- Spelled-pitch identity remains intact in displayed synthetic notes (`C#4` and `Db4` both remain present in UI tests).
- Selection interactions update UI state only; domain score data remains unchanged by click-selection behavior.
- Deferred private corpus policy remains intact (`awaiting-private-rule-pack`).

## 2026-05-05 — Integration Gate 07 (Prompts 31-34)

### Scope audited
- Inspector selectors and inspector panel data flow.
- 31-EDO on-screen keyboard rendering and accessibility contract.
- Keyboard note-entry command flow and history/project-store coherence.
- Source-agnostic diagnostic model and provenance/location contracts.

### Checks run
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview -- --host 127.0.0.1 --port 4173` and local HTTP request.

### Result
- All automated checks passed.
- Preview shell still serves and root HTML loads successfully.
- No new product feature scope was added in this integration gate.

### Repairs made
- No contract or code repairs were required during this gate.
- Added this gate entry and refreshed known-risk tracking for keyboard entry and diagnostics contracts.

### Contract integrity notes
- Spelled-pitch identity remains intact in keyboard entry tests (`C#` insert and `Db` update remain distinct).
- Note-entry path continues to use command/history application rather than direct score mutation.
- Diagnostic provenance remains source-agnostic with explicit support for `awaiting-private-rule-pack` and no historical claims.

## 2026-05-06 — Integration Gate 08 (Prompts 36-39)

### Scope audited
- Rule plugin interfaces and registry execution semantics.
- Builtin mechanical validators (range, voice order, spacing heuristic).
- Deterministic analysis runner and analysis selectors.
- Inspector diagnostic list and SATB event-level diagnostic annotations.

### Checks run
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview -- --host 127.0.0.1 --port 4173` and local HTTP request.

### Result
- All automated checks passed.
- Preview shell still serves successfully and root HTML loads.
- No new feature scope beyond audited analyzer/diagnostic work was added in this gate.

### Repairs made
- No contract or code repairs were required during this gate.
- Added this gate entry and refreshed known-risk tracking for analyzer UI coupling and diagnostic ordering policy.

### Contract integrity notes
- Mechanical validators remain source-agnostic and do not embed historical rule content.
- Analysis runner behavior remains deterministic with stable diagnostic ordering and controlled plugin error capture.
- Deferred private-data pathway remains explicit via `awaiting-private-rule-pack` statuses and provenance.


## 2026-05-06 — Integration Gate 09 (Prompts 40-44)

### Scope audited
- Synthetic chord-kind schema and recognition contracts.
- Generation request/candidate/result type contracts and serialization safety.
- Tiny deterministic `generateFromFixedVoice` stub and mechanical scoring diagnostics.
- Provisional explanation and deferred private-data signaling (`awaiting-private-rule-pack`).

### Checks run
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- Manual preview smoke check via `npm run preview -- --host 127.0.0.1 --port 4173` and local HTTP HEAD request.

### Result
- All automated checks passed.
- Preview shell still serves successfully and root HTML loads.
- No new feature scope was introduced beyond integration verification and documentation updates.

### Repairs made
- No contract or code repairs were required during this gate.
- Added this gate entry and refreshed known-risk tracking for deterministic generation/scoring limitations.

### Contract integrity notes
- Spelled-pitch identity remains intact in generation fixtures (`C#` accidental preserved across generated voices) and chord recognition outputs keep spelled objects intact.
- Generation contracts continue to require explicit explanations and source-agnostic rejection metadata.
- Deferred private corpus policy remains explicit (`awaiting-private-rule-pack`) with no historical claims embedded in logic.
