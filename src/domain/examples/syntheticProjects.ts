import { normalizeRational } from '../duration/Rational';
import { makeSpelledPitch } from '../pitch/SpelledPitch';
import type { Project } from '../score/Project';
import { createEmptyProject } from '../score/createEmptyProject';

export type SyntheticExampleProject = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly project: Project;
};

function exampleCSharpDb(): Project {
  const base = createEmptyProject('example-csharp-db', 'Synthetic C#/Db Distinction');
  return {
    ...base,
    score: {
      ...base.score,
      measures: [{ id: 'm1', index: 0, events: [
        { id: 'n-s-csharp', kind: 'note', voiceId: 'soprano', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }) },
        { id: 'n-a-dflat', kind: 'note', voiceId: 'alto', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }) },
      ] }],
    },
  };
}

function exampleMechanicalViolation(): Project {
  const base = createEmptyProject('example-violation', 'Synthetic Mechanical Violation');
  return {
    ...base,
    score: {
      ...base.score,
      measures: [{ id: 'm1', index: 0, events: [
        { id: 's-high', kind: 'note', voiceId: 'soprano', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'E', accidental: 0, octave: 3 }) },
        { id: 'a-cross', kind: 'note', voiceId: 'alto', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }) },
        { id: 't-low', kind: 'note', voiceId: 'tenor', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 2 }) },
      ] }],
    },
  };
}

function examplePlaybackTiny(): Project {
  const base = createEmptyProject('example-playback', 'Synthetic Tiny Playback');
  return {
    ...base,
    score: {
      ...base.score,
      measures: [{ id: 'm1', index: 0, events: [
        { id: 's1', kind: 'note', voiceId: 'soprano', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 }) },
        { id: 'a1', kind: 'note', voiceId: 'alto', onset: normalizeRational({ numerator: 1, denominator: 4 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'E', accidental: 0, octave: 4 }) },
      ] }],
    },
  };
}

export const SYNTHETIC_EXAMPLE_PROJECTS: readonly SyntheticExampleProject[] = [
  {
    id: 'empty',
    label: 'Synthetic Empty Project',
    description: 'Synthetic demo project with no notes. Not historically authoritative.',
    project: createEmptyProject('example-empty', 'Synthetic Empty Project'),
  },
  {
    id: 'csharp-db',
    label: 'Synthetic C#/Db Distinction',
    description: 'Synthetic demo preserving distinct spellings for C# and Db. Not historically authoritative.',
    project: exampleCSharpDb(),
  },
  {
    id: 'mechanical-violation',
    label: 'Synthetic Mechanical Violation',
    description: 'Synthetic demo intentionally containing range/crossing issues. Not historically authoritative.',
    project: exampleMechanicalViolation(),
  },
  {
    id: 'tiny-playback',
    label: 'Synthetic Tiny Playback',
    description: 'Synthetic tiny playback-ready note sequence. Not historically authoritative.',
    project: examplePlaybackTiny(),
  },
];
