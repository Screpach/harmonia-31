import type { Project } from '../../domain/score/Project';
import type { Measure } from '../../domain/score/Measure';
import type { ScoreEvent } from '../../domain/score/Event';

export type RuleExternalData = {
  readonly rulePackId: string;
  readonly payload: unknown;
};

export type RuleContext = {
  readonly project: Project;
  readonly tuning: Project['tuning'];
  readonly externalData?: RuleExternalData;
  getMeasureById: (measureId: string) => Measure | null;
  getEventsForVoice: (voiceId: Project['score']['voices'][number]) => readonly ScoreEvent[];
};

export function createRuleContext(project: Project, externalData?: RuleExternalData): RuleContext {
  return {
    project,
    tuning: project.tuning,
    externalData,
    getMeasureById: (measureId) => project.score.measures.find((measure) => measure.id === measureId) ?? null,
    getEventsForVoice: (voiceId) =>
      project.score.measures.flatMap((measure) => measure.events.filter((event) => event.voiceId === voiceId)),
  };
}
