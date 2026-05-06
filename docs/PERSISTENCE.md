# Local Project Persistence

Harmonia 31 currently uses a local-first browser persistence adapter for the active project.

## Current scope

- Stores one project JSON payload in `localStorage`.
- Validates and migrates loaded payloads through native schema migration (`migrateProjectData`).
- Falls back safely to an empty/default project if persisted data is missing or invalid.
- Does **not** include accounts, cloud sync, or network backends.

## Behavior notes

- Persistence is triggered from project-store edit flows (command apply and keyboard pitch apply).
- Load failures are handled gracefully (`null` load result) so app boot does not crash.
- Spelled pitch identity is preserved by storing native project JSON directly.

## Reset / clear

- For manual reset in browser dev tools, remove key:
  - `harmonia31.current-project.v1`
