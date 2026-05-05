# Harmonia 31

Harmonia 31 is a browser-first web app for exploring SATB harmony in **31-EDO** and quarter-comma-meantone-oriented workflows.

## What this repository is for

This repository is currently focused on **planning, architecture, and contracts** rather than feature implementation.

The project will support:
- analysis and generation workflows for SATB harmony,
- notation-like editing of voiced material,
- playback for ear-training and validation,
- beginner-maintainable, online-friendly web delivery.

## Current status

Private historical references, rule tables, and the final rule corpus are **not available yet**.

Until those assets are provided, this repo uses:
- source-agnostic interfaces,
- typed extension points,
- synthetic fixtures,
- non-historical mechanical invariants.

See the charter and architecture notes:
- [Project Charter](docs/PROJECT_CHARTER.md)
- [Architecture Decisions](docs/ARCHITECTURE_DECISIONS.md)
- [Roadmap Micro Prompts](docs/ROADMAP_MICRO_PROMPTS.md)

## Non-negotiable design boundary

Domain logic must stay independent from rendering, audio, storage, and UI frameworks. Adapters may depend on the domain layer; the domain layer must not depend on adapters.

## Contributor quick start

1. Read [AGENTS.md](AGENTS.md) for repository-wide agent instructions.
2. Keep changes small, typed, and reviewable.
3. Do not invent or embed private rule data.
