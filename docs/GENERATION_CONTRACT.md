# Generation Contract (Pre-Algorithm)

This document defines the data contract for SATB generation in Harmonia 31 before any harmonization/search algorithm is implemented.

## Why this exists

- We need stable interfaces so future generation work can proceed independently of React/UI and storage.
- We must keep 31-EDO spelled pitch identity intact (`C#` and `Db` remain distinct spellings in generated events).
- We cannot depend on private historical rule packs yet, so contracts include explicit placeholders for `awaiting-private-rule-pack` scenarios.

## Request (`GenerationRequest`)

A request includes:

- **Project snapshot** to generate against.
- **Active voice** and **target voices** for the run.
- **Selected fixed voices** (voices held constant while others are generated).
- **Locked events** that may not be edited.
- **Search limits** (`maxCandidates`, `maxNodesVisited`, `timeoutMs`).
- **Request metadata** (`requestId`, `requestedAt`).

Validation currently ensures:

- `activeVoice` is included in `targetVoices`.
- `targetVoices` is non-empty and contains no duplicates.
- Search limits are positive integers.

## Candidate (`GenerationCandidate`)

Each candidate includes:

- Rank and stable candidate ID.
- Generated events (or event replacements) with full spelled-pitch data.
- Scoring breakdown for transparent comparisons.
- Diagnostics gathered during generation checks.
- Mandatory beginner-friendly explanation string.

## Result (`GenerationResult`)

The result supports:

- Multiple ranked candidates.
- Explicit rejection reasons (including `awaiting-private-rule-pack`).
- Top-level explanation.
- Telemetry fields designed for future worker/cancellation integrations.

## Not implemented yet

- Real harmonization/search algorithm.
- Worker-thread execution.
- Cancellation signal wiring.

These will be added in later prompts without changing the basic request/candidate/result contract unless migration is explicitly documented.
