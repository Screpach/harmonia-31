import type { VoiceId } from '../../domain/voice/Voice';

export type ShortcutActionId =
  | 'transport.togglePlayPause'
  | 'selection.voice.soprano'
  | 'selection.voice.alto'
  | 'selection.voice.tenor'
  | 'selection.voice.bass'
  | 'ui.toggleInspector'
  | 'pitch.raisePlaceholder'
  | 'pitch.lowerPlaceholder';

export type ShortcutDefinition = {
  readonly id: string;
  readonly key: string;
  readonly description: string;
  readonly action: ShortcutActionId;
  readonly proposed?: boolean;
};

export const SHORTCUT_REGISTRY: readonly ShortcutDefinition[] = [
  {
    id: 'transport-toggle-play',
    key: 'Space',
    description: 'Play/Pause transport (placeholder; not wired to playback engine yet).',
    action: 'transport.togglePlayPause',
    proposed: true,
  },
  { id: 'voice-soprano', key: 's', description: 'Set active voice to soprano.', action: 'selection.voice.soprano' },
  { id: 'voice-alto', key: 'a', description: 'Set active voice to alto.', action: 'selection.voice.alto' },
  { id: 'voice-tenor', key: 't', description: 'Set active voice to tenor.', action: 'selection.voice.tenor' },
  { id: 'voice-bass', key: 'b', description: 'Set active voice to bass.', action: 'selection.voice.bass' },
  {
    id: 'toggle-inspector',
    key: 'i',
    description: 'Toggle inspector panel visibility.',
    action: 'ui.toggleInspector',
  },
  {
    id: 'pitch-raise-placeholder',
    key: 'ArrowUp',
    description: 'Raise selected pitch (future editing command).',
    action: 'pitch.raisePlaceholder',
    proposed: true,
  },
  {
    id: 'pitch-lower-placeholder',
    key: 'ArrowDown',
    description: 'Lower selected pitch (future editing command).',
    action: 'pitch.lowerPlaceholder',
    proposed: true,
  },
] as const;

export const ACTION_TO_VOICE: Record<Extract<ShortcutActionId, `selection.voice.${string}`>, VoiceId> = {
  'selection.voice.soprano': 'soprano',
  'selection.voice.alto': 'alto',
  'selection.voice.tenor': 'tenor',
  'selection.voice.bass': 'bass',
};
