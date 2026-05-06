import type { AudioEvent } from './schedule/AudioEvent';

export type PlaybackAdapter = {
  unlock(): Promise<void>;
  playSchedule(events: readonly AudioEvent[], options?: { fromBeat?: number }): Promise<void>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
};
