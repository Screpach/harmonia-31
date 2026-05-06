# Harmonia 31 Project Charter

## Product intent

Harmonia 31 is a browser-first, online-friendly web app for exploring, analyzing, editing, generating, and auditioning SATB harmony in 31-EDO, with quarter-comma-meantone-oriented usage.

## Target users

- learners studying tuning-aware harmony,
- composers and arrangers experimenting with 31-EDO spelling and voice-leading,
- maintainers who need a clear, testable codebase.

## Scope boundaries (current phase)

In scope now:
- repository planning backbone,
- typed contracts and extension points,
- architecture and prompt roadmap documentation.

Out of scope now:
- final historical rule implementation,
- proprietary corpus integration,
- closed-source dependencies.

## Deferred private data policy

Private historical references and final rule corpus are pending. All integration points that depend on them must be explicitly labeled `awaiting-private-rule-pack` and remain optional so the app can run with synthetic fixtures.

## Engineering principles

- strict TypeScript and explicit contracts,
- small, reviewable changes,
- domain logic independent of UI/rendering/audio/storage,
- preserve 31-EDO spelled-pitch identity everywhere pitch appears.
