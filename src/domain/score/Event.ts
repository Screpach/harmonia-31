import type { Rational } from '../duration/Rational';
import type { SpelledPitch } from '../pitch/SpelledPitch';
import type { VoiceId } from '../voice/Voice';

export type BaseEvent = {
  readonly id: string;
  readonly voiceId: VoiceId;
  readonly onset: Rational;
  readonly duration: Rational;
};

export type NoteEvent = BaseEvent & {
  readonly kind: 'note';
  readonly pitch: SpelledPitch;
};

export type RestEvent = BaseEvent & {
  readonly kind: 'rest';
};

export type ScoreEvent = NoteEvent | RestEvent;
