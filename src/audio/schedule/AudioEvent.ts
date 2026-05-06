import type { VoiceId } from '../../domain/voice/Voice';

export type AudioEvent = {
  readonly eventId: string;
  readonly voiceId: VoiceId;
  readonly frequencyHz: number;
  readonly startBeat: number;
  readonly startTimeSec: number;
  readonly durationBeats: number;
  readonly durationSec: number;
  readonly velocity: number;
};
