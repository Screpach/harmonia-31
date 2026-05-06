import { describe, expect, it } from 'vitest';
import { validateProjectData } from '../schema/projectSchema';
import { frequencyOfPitch } from '../tuning/frequency';
import { analyzeProject } from '../../engine/analysis/analyzeProject';
import { rangeRule } from '../../engine/rules/builtin/rangeRule';
import { voiceOrderRule } from '../../engine/rules/builtin/voiceOrderRule';
import { SYNTHETIC_EXAMPLE_PROJECTS } from './syntheticProjects';

describe('synthetic example projects', () => {
  it('all examples validate against project schema', () => {
    SYNTHETIC_EXAMPLE_PROJECTS.forEach((example) => {
      expect(() => validateProjectData(example.project)).not.toThrow();
    });
  });

  it('C#/Db example preserves distinct frequencies', () => {
    const project = SYNTHETIC_EXAMPLE_PROJECTS.find((e) => e.id === 'csharp-db')!.project;
    const notes = project.score.measures[0]!.events.filter((e): e is Extract<typeof e, { kind: 'note' }> => e.kind === 'note');
    expect(frequencyOfPitch(notes[0]!.pitch, project.tuning)).not.toBe(frequencyOfPitch(notes[1]!.pitch, project.tuning));
  });

  it('violation example emits mechanical diagnostics', () => {
    const project = SYNTHETIC_EXAMPLE_PROJECTS.find((e) => e.id === 'mechanical-violation')!.project;
    const result = analyzeProject(project, [rangeRule, voiceOrderRule]);
    expect(result.diagnostics.length).toBeGreaterThan(0);
  });
});
