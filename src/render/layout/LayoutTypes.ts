import type { VoiceId } from '../../domain/voice/Voice';

export type Rect = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

export type StaveLayout = {
  readonly voiceId: VoiceId;
  readonly bounds: Rect;
};

export type MeasureLayout = {
  readonly measureId: string;
  readonly index: number;
  readonly bounds: Rect;
};

export type EventLayout = {
  readonly eventId: string;
  readonly measureId: string;
  readonly voiceId: VoiceId;
  readonly kind: 'note' | 'rest';
  readonly bounds: Rect;
};

export type CursorAnchor = {
  readonly voiceId: VoiceId;
  readonly measureId: string;
  readonly x: number;
  readonly y: number;
};

export type ScoreLayout = {
  readonly width: number;
  readonly zoom: number;
  readonly staves: readonly StaveLayout[];
  readonly measures: readonly MeasureLayout[];
  readonly events: readonly EventLayout[];
  readonly cursorAnchors: readonly CursorAnchor[];
};

export type LayoutOptions = {
  readonly width: number;
  readonly zoom?: number;
};
