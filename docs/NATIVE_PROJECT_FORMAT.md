# Native Project Format (JSON)

Harmonia 31's native project format is JSON validated at runtime against the current schema.

## Scope

- Native JSON is the only planned **lossless** project interchange format.
- Import/export UI is not implemented yet.
- Private rule corpus integration remains deferred (`awaiting-private-rule-pack`).

## Current schema highlights

Top-level `Project` fields:
- `schemaVersion` (integer)
- `id` (stable string)
- `title` (string)
- `tuning` (`referencePitch`, `referenceFrequency`)
- `score` (`tempoBpm`, `timeSignature`, `voices`, `measures`)
- `createdAt`, `updatedAt` (ISO datetime strings)

Score events:
- `note` event: includes `pitch`
- `rest` event: no pitch field
- both require stable `id`, `voiceId`, rational `onset`, rational `duration`

## Runtime validation and migration

- Runtime validation is defined in `src/domain/schema/projectSchema.ts` (Zod).
- Migration entrypoint is `migrateProjectData` in `src/domain/schema/migrations.ts`.
- Current registry supports only the active schema version.
- Unknown versions raise a controlled `SchemaMigrationError`.
