# Keyboard Shortcuts (Registry Foundation)

Current shortcuts are declared centrally in `src/ui/keyboard/shortcutRegistry.ts`.

## Wired now

- `S` → active voice: soprano
- `A` → active voice: alto
- `T` → active voice: tenor
- `B` → active voice: bass
- `I` → toggle inspector visibility

## Proposed placeholders (not yet wired to score editing/playback)

- `Space` → play/pause transport placeholder
- `ArrowUp` → raise pitch placeholder
- `ArrowDown` → lower pitch placeholder

## Safety behavior

Keyboard hook ignores shortcuts when the event target is editable (`input`, `textarea`, or `contenteditable`) to avoid hijacking text entry.
