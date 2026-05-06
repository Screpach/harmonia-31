import type { Project } from '../domain/score/Project';
import type { PlaybackAdapter } from './PlaybackAdapter';
import { createAudioSchedule } from './schedule/createAudioSchedule';

type Raf = (cb: FrameRequestCallback) => number;
type Caf = (id: number) => void;

export type PlaybackControllerDependencies = {
  adapter: PlaybackAdapter;
  nowMs?: () => number;
  requestFrame?: Raf;
  cancelFrame?: Caf;
  createSchedule?: typeof createAudioSchedule;
  onBeat?: (beat: number) => void;
  onStop?: () => void;
};

export function createPlaybackController(deps: PlaybackControllerDependencies) {
  const nowMs = deps.nowMs ?? (() => performance.now());
  const requestFrame = deps.requestFrame ?? requestAnimationFrame;
  const cancelFrame = deps.cancelFrame ?? cancelAnimationFrame;
  const scheduleFactory = deps.createSchedule ?? createAudioSchedule;

  let frameId: number | null = null;
  let startedAtMs = 0;
  let bpm = 96;

  const tick = () => {
    const elapsedSec = (nowMs() - startedAtMs) / 1000;
    const beat = (elapsedSec * bpm) / 60;
    deps.onBeat?.(beat);
    frameId = requestFrame(tick);
  };

  return {
    async play(project: Project, options: { bpm?: number } = {}): Promise<void> {
      bpm = options.bpm ?? project.score.tempoBpm;
      const schedule = scheduleFactory(project);
      await deps.adapter.unlock();
      await deps.adapter.playSchedule(schedule);
      startedAtMs = nowMs();
      frameId = requestFrame(tick);
    },
    async stop(): Promise<void> {
      if (frameId !== null) {
        cancelFrame(frameId);
        frameId = null;
      }
      await deps.adapter.stop();
      deps.onBeat?.(0);
      deps.onStop?.();
    },
  };
}
