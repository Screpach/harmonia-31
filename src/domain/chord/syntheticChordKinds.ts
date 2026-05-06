import type { ChordKind } from './ChordKind';

/**
 * Synthetic development-only seed data for architecture testing.
 * Not historical and not a substitute for private/public production rule packs.
 */
export const SYNTHETIC_CHORD_KINDS: readonly ChordKind[] = [
  {
    id: 'major-triad-synthetic',
    name: 'Major triad (synthetic)',
    intervalSteps31: [0, 10, 18],
    inversions: [
      { inversion: 'root', bassToneIndex: 0 },
      { inversion: 'first', bassToneIndex: 1 },
      { inversion: 'second', bassToneIndex: 2 },
    ],
    aliases: ['maj', 'M'],
    provenance: { source: 'synthetic-development-only' },
  },
  {
    id: 'minor-triad-synthetic',
    name: 'Minor triad (synthetic)',
    intervalSteps31: [0, 8, 18],
    inversions: [
      { inversion: 'root', bassToneIndex: 0 },
      { inversion: 'first', bassToneIndex: 1 },
      { inversion: 'second', bassToneIndex: 2 },
    ],
    aliases: ['min', 'm'],
    provenance: { source: 'synthetic-development-only' },
  },
];
