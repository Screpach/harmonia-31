# Third-Party Library Review Template

Use this checklist before adding any dependency.

## Identification

- Name:
- Layer (framework/audio/notation/testing/etc.):
- Repository URL:
- Version evaluated:
- License (SPDX):

## Fitness assessment

- Problem this library solves in Harmonia 31:
- Why adapter-based integration is feasible:
- Domain boundary impact (must remain adapter-independent):
- 31-EDO spelled-pitch impact (`C#` vs `Db` must remain distinct):
- Accessibility considerations:

## Project health signals

- Recent release date:
- Recent commit activity:
- Bus factor/governance signal:
- Issue response trend:

## Risk analysis

- Technical risks:
- License/compliance risks:
- Security/supply-chain risks:
- Lock-in risks:

## Validation plan (pre-adoption)

- Minimal proof-of-concept scope:
- Tests required:
- Rollback strategy:
- Fallback candidate:

## Decision

- Status: proposed | accepted | deferred | rejected
- Decision date:
- Owner:
- Notes:

## Deferred private rule-pack reminder

If this dependency would consume historical rules or corpus data, block integration and tag related tasks as `awaiting-private-rule-pack`.
