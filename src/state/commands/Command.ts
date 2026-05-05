import type { SpelledPitch } from '../../domain/pitch/SpelledPitch';
import type { Rational } from '../../domain/duration/Rational';
import type { VoiceId } from '../../domain/voice/Voice';

export type CommandMeta = {
  readonly commandId: string;
  readonly issuedAt: string;
  readonly source: 'system' | 'user';
};

export type NoOpCommand = {
  readonly kind: 'noop';
  readonly meta: CommandMeta;
  readonly reason?: string;
};

export type InsertNoteCommand = {
  readonly kind: 'insert-note';
  readonly meta: CommandMeta;
  readonly measureId: string;
  readonly eventId: string;
  readonly voiceId: VoiceId;
  readonly onset: Rational;
  readonly duration: Rational;
  readonly pitch: SpelledPitch;
};

export type DeleteEventCommand = {
  readonly kind: 'delete-event';
  readonly meta: CommandMeta;
  readonly measureId: string;
  readonly eventId: string;
};

export type UpdateNotePitchCommand = {
  readonly kind: 'update-note-pitch';
  readonly meta: CommandMeta;
  readonly measureId: string;
  readonly eventId: string;
  readonly pitch: SpelledPitch;
};

export type Command = NoOpCommand | InsertNoteCommand | DeleteEventCommand | UpdateNotePitchCommand;
