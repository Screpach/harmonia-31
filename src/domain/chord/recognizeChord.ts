import type { SpelledPitch } from '../pitch/SpelledPitch';
import { absoluteStep31 } from '../tuning/frequency';
import type { ChordKind } from './ChordKind';
import type { ChordRecognitionResult } from './ChordAnalysis';
import { SYNTHETIC_CHORD_KINDS } from './syntheticChordKinds';

const MOD = 31;

function toPitchClassStep(pitch: SpelledPitch): number {
  const step = absoluteStep31(pitch);
  return ((step % MOD) + MOD) % MOD;
}

function uniqueSorted(values: readonly number[]): number[] {
  return [...new Set(values)].sort((a, b) => a - b);
}

function matchKind(root: SpelledPitch, sonority: readonly SpelledPitch[], kind: ChordKind) {
  const rootPc = toPitchClassStep(root);
  const target = uniqueSorted(kind.intervalSteps31.map((step) => (rootPc + step) % MOD));
  const observed = uniqueSorted(sonority.map(toPitchClassStep));
  const exact = target.length === observed.length && target.every((value, index) => value === observed[index]);
  if (exact) {
    return {
      chordKindId: kind.id,
      chordKindName: kind.name,
      root,
      matchedSpelledPitches: sonority,
      confidence: 1,
      rationale: 'synthetic-exact-step-set-match' as const,
    };
  }

  const containsTarget = target.every((value) => observed.includes(value));
  if (!containsTarget) return null;

  return {
    chordKindId: kind.id,
    chordKindName: kind.name,
    root,
    matchedSpelledPitches: sonority,
    confidence: target.length / observed.length,
    rationale: 'synthetic-partial-match' as const,
  };
}

export function recognizeChord(
  sonority: readonly SpelledPitch[],
  options: { candidateRoot?: SpelledPitch; chordKinds?: readonly ChordKind[] } = {},
): ChordRecognitionResult {
  if (sonority.length === 0) {
    return { candidates: [], status: 'unknown', source: 'synthetic-development-only' };
  }

  const roots = options.candidateRoot ? [options.candidateRoot] : sonority;
  const kinds = options.chordKinds ?? SYNTHETIC_CHORD_KINDS;

  const candidates = roots.flatMap((root) => kinds.map((kind) => matchKind(root, sonority, kind)).filter(Boolean)) as ChordRecognitionResult['candidates'];

  return {
    candidates,
    status: candidates.length > 0 ? 'matched' : 'unknown',
    source: 'synthetic-development-only',
  };
}
