import type { Score } from './Score';
import type { ThirtyOneEdoTuning } from '../tuning/TuningSystem';

export const PROJECT_SCHEMA_VERSION = 1 as const;

export type Project = {
  readonly schemaVersion: number;
  readonly id: string;
  readonly title: string;
  readonly tuning: ThirtyOneEdoTuning;
  readonly score: Score;
  readonly createdAt: string;
  readonly updatedAt: string;
};
