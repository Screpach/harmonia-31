# Tone playback adapter

This folder contains a browser playback adapter that consumes `AudioEvent` schedules and forwards explicit frequencies to Tone.js.

## Contract

- Input is `AudioEvent[]` from `createAudioSchedule`.
- Frequencies are passed directly (`frequencyHz`), not note-name strings.
- Adapter is isolated from domain scoring/rule logic.

## Notes

- `unlock()` must be called in a user gesture context before playback.
- No sound is started automatically.
- This adapter is provisional and intentionally simple while broader transport/state integration is pending.
