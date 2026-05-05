# Open-Source Reconnaissance Matrix

Purpose: shortlist permissive-license candidates without installing dependencies.

## Selection filters

- License must be permissive or clearly compatible (MIT, Apache-2.0, BSD, ISC).
- Must fit browser-first TypeScript architecture and adapter boundaries.
- Must not force domain coupling that would blur 31-EDO spelled-pitch identity.
- Must support testability and beginner maintainability.

## Candidate matrix (sorted by layer)

| Layer | Candidate | GitHub URL | License | Project health signals | Harmonia 31 fit | Risks | Fallback plan |
|---|---|---|---|---|---|---|---|
| App framework | React | https://github.com/facebook/react | MIT | Large maintainer base, frequent releases, stable ecosystem | Strong for browser UI and component architecture; domain can stay adapter-independent | UI complexity can grow quickly | Use Preact or plain Web Components adapters |
| App framework | Vue | https://github.com/vuejs/core | MIT | Mature governance and active releases | Friendly learning curve; good for beginner maintainers | Team/context-switch risk if prior React assumptions exist | Stay framework-agnostic in domain and defer framework lock |
| Build/tooling | Vite | https://github.com/vitejs/vite | MIT | Active releases and broad TS ecosystem support | Fast dev cycle; works well for small-review workflow | Plugin sprawl and version drift | Use esbuild or webpack only if constraints emerge |
| Notation/rendering | VexFlow | https://github.com/vexflow/vexflow | MIT | Long-running project used in multiple notation apps | SVG/canvas music engraving primitives useful for notation-like editing | 12-EDO defaults may require custom accidentals/glyph mapping for 31-EDO | Build custom rendering adapter over Canvas/SVG with minimal primitives |
| Notation/rendering | OpenSheetMusicDisplay | https://github.com/opensheetmusicdisplay/opensheetmusicdisplay | BSD-3-Clause | Active community and regular issue activity | Fast path for score display experiments and MusicXML playback visuals | MusicXML assumptions may not represent 31-EDO spelling cleanly | Keep as optional read-only preview adapter and fall back to VexFlow/custom renderer |
| Audio | Tone.js | https://github.com/Tonejs/Tone.js | MIT | Mature Web Audio abstraction with active usage | Useful scheduling and synthesis primitives for browser playback | Equal-temperament defaults; microtonal mapping requires explicit frequency tables | Implement native Web Audio adapter with deterministic timing layer |
| Audio | Howler.js | https://github.com/goldfire/howler.js | MIT | Stable and widely deployed for web audio playback | Good for sample playback and simple transport controls | Limited symbolic/music-theory features | Use Web Audio API directly for synthesized tones |
| Validation | Zod | https://github.com/colinhacks/zod | MIT | High adoption in TS ecosystems and active releases | Strong runtime validation for adapter boundaries and fixtures | Schema drift if overused as domain model | Use valibot or custom guards for critical hot paths |
| Validation | Valibot | https://github.com/fabian-hiller/valibot | MIT | Growing TS validator focused on bundle efficiency | Lightweight option for browser-first constraints | Smaller ecosystem than Zod | Default to Zod if team needs broader examples/docs |
| State store | Zustand | https://github.com/pmndrs/zustand | MIT | Mature PMNDRS ecosystem and active maintenance | Minimal API; easy to keep UI state separate from domain core | Risk of mixing domain logic into store actions | Enforce “store as adapter” rule in architecture docs |
| State store | Jotai | https://github.com/pmndrs/jotai | MIT | Active maintainer set and steady releases | Composable atoms for editor UI state experiments | Atom graph complexity at scale | Fallback to Zustand or framework-native state |
| Testing | Vitest | https://github.com/vitest-dev/vitest | MIT | Fast-moving project aligned with Vite | Good fit for TS unit tests and adapter contract tests | Coupling to Vite assumptions | Use Jest for non-Vite environments |
| Testing | Playwright | https://github.com/microsoft/playwright | Apache-2.0 | Strong release cadence, cross-browser support | End-to-end coverage for playback/editor workflows | CI cost and flaky timing tests with audio | Keep E2E thin; use deterministic unit tests for domain/audio math |
| Styling | Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | MIT | Large ecosystem and active maintenance | Rapid UI iteration for beginner-friendly scaffolds | Utility sprawl and readability drift | Use CSS Modules or vanilla-extract for stricter boundaries |
| Styling | vanilla-extract | https://github.com/vanilla-extract-css/vanilla-extract | MIT | Active TypeScript-focused styling project | Typed styles help long-term maintainability | Build setup complexity vs plain CSS | Use plain CSS Modules if setup overhead is too high |
| Storage | Dexie.js | https://github.com/dexie/Dexie.js | Apache-2.0 | Mature IndexedDB wrapper and active releases | Useful for offline-friendly browser persistence | IndexedDB schema migration complexity | Use localStorage for lightweight snapshots initially |
| Storage | localForage | https://github.com/localForage/localForage | Apache-2.0 | Long-standing project and stable API | Simple async storage abstraction with IndexedDB/WebSQL/localStorage fallback | Less explicit schema control than Dexie | Move to Dexie when structured persistence requirements grow |

## Preliminary shortlist (no installs yet)

- Framework/tooling: React + Vite.
- Notation: VexFlow first, OSMD optional read-only adapter.
- Audio: Tone.js first, native Web Audio adapter as backup.
- Validation: Zod first, Valibot as bundle-focused alternative.
- State: Zustand first.
- Tests: Vitest + Playwright (thin E2E layer).
- Styling: Tailwind for speed, vanilla-extract for typed hardening phases.
- Storage: Dexie for structured offline data.

## 31-EDO and deferred rule-pack notes

- No candidate is accepted as a source of historical rule truth.
- Rule corpus integration remains `awaiting-private-rule-pack`.
- Pitch spelling identity must remain in domain contracts, never inferred from UI/audio libraries.
- Any library adoption prompt must include a proof that `C#` and `Db` remain distinct domain values.
