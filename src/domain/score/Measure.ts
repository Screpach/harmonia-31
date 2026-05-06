import type { ScoreEvent } from './Event';

export type Measure = {
  readonly id: string;
  readonly index: number;
  readonly events: readonly ScoreEvent[];
};
