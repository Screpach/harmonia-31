# Harmonia 31

Harmonia 31 is a browser-first web app scaffold for SATB harmony workflows in **31-EDO**.

## Current phase

This repository focuses on **typed contracts, synthetic fixtures, and integration scaffolding**.
Private/historical rule corpora are not yet available and remain deferred as `awaiting-private-rule-pack`.

## Quick start

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
```

## Beginner docs

- [Beginner Online Workflow](docs/BEGINNER_ONLINE_WORKFLOW.md)
- [Deployment Notes](docs/DEPLOYMENT.md)
- [Accessibility Checklist](docs/ACCESSIBILITY_CHECKLIST.md)
- [Synthetic Examples](docs/EXAMPLES.md)
- [Persistence](docs/PERSISTENCE.md)
- [Third-Party Notices](docs/THIRD_PARTY_NOTICES.md)

## Architecture guardrails

- Domain logic must remain independent of UI/audio/storage adapters.
- 31-EDO spelled pitch identity is first-class (`C#` and `Db` remain distinct).
- Synthetic fixtures are for demos/tests only and are not historically authoritative.
