import { describe, expect, it } from 'vitest';
import { SYNTHETIC_CHORD_KINDS } from './syntheticChordKinds';
import { validateChordKinds } from './chordKindSchema';

describe('chord kind schema', () => {
  it('validates synthetic seed chord kinds', () => {
    const validated = validateChordKinds(SYNTHETIC_CHORD_KINDS);
    expect(validated).toHaveLength(2);
  });

  it('inversions reference valid chord tone indexes', () => {
    expect(() =>
      validateChordKinds([
        {
          ...SYNTHETIC_CHORD_KINDS[0],
          inversions: [{ inversion: 'root', bassToneIndex: 9 }],
        },
      ]),
    ).toThrow(/bassToneIndex/);
  });

  it('seed provenance is explicit synthetic-development-only', () => {
    const validated = validateChordKinds(SYNTHETIC_CHORD_KINDS);
    expect(validated.every((kind) => kind.provenance.source === 'synthetic-development-only')).toBe(true);
  });
});
