# Rule Pack Extension Interface

Date: 2026-05-06

## Purpose

Define how analyzer plugins can run now (mechanical checks) and later accept private/historical rule packs without changing UI/state contracts.

## Current interface

- `RulePlugin` includes:
  - `id`, `version`
  - `modes` (`mechanical`, `historical`, `hybrid`)
  - `requiredData` (`none` or `external` with `awaiting-private-rule-pack`)
  - `analyze(context)`
- `RuleContext` includes:
  - `project`, `tuning`
  - optional `externalData`
  - score-slice helpers (`getMeasureById`, `getEventsForVoice`)
- `ruleRegistry` behavior:
  - registers plugins
  - runs all plugins against one context
  - returns controlled `unavailable` results when external data is required but not present

## Adding private rule packs later

1. Load a validated private rule payload in an adapter boundary (not inside React/UI components).
2. Provide that payload to `createRuleContext(project, externalData)`.
3. Register plugins whose `requiredData.kind` is `external` and whose `rulePackId` matches the loaded data.
4. Keep plugin output in the shared diagnostic model (`src/engine/diagnostics/Diagnostic.ts`).

## Guardrails

- Do not embed private historical content in built-in plugins.
- Use `awaiting-private-rule-pack` as the explicit deferred state when data is absent.
- Keep analyzer outputs source-agnostic and JSON-serializable.
