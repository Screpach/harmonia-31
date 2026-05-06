import { describe, expect, it, vi } from 'vitest';
import { createPlaybackController } from './playbackController';
import type { PlaybackAdapter } from './PlaybackAdapter';
import { createEmptyProject } from '../domain/score/createEmptyProject';
import { normalizeRational } from '../domain/duration/Rational';
import { makeSpelledPitch } from '../domain/pitch/SpelledPitch';
import type { Project } from '../domain/score/Project';

function makeProject(): Project {
  const p = createEmptyProject('p1');
  return {
    ...p,
    score: {
      ...p.score,
      measures: [{
        id: 'm1',
        index: 0,
        events: [{
          id: 'n1',
          kind: 'note',
          voiceId: 'soprano',
          onset: normalizeRational({ numerator: 0, denominator: 1 }),
          duration: normalizeRational({ numerator: 1, denominator: 4 }),
          pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
        }],
      }],
    },
  };
}

describe('playbackController', () => {
  it('calls adapter with frequency schedule', async () => {
    const adapter: PlaybackAdapter = {
      unlock: vi.fn(async () => {}), playSchedule: vi.fn(async () => {}), stop: vi.fn(async () => {}), pause: vi.fn(async () => {}), resume: vi.fn(async () => {}),
    };

    const controller = createPlaybackController({ adapter });
    await controller.play(makeProject());

    expect(adapter.unlock).toHaveBeenCalled();
    expect(adapter.playSchedule).toHaveBeenCalled();
    const arg = (adapter.playSchedule as ReturnType<typeof vi.fn>).mock.calls[0]![0];
    expect(arg[0].frequencyHz).toBeTypeOf('number');
  });

  it('stop calls adapter stop and resets beat state', async () => {
    const onBeat = vi.fn();
    const adapter: PlaybackAdapter = {
      unlock: vi.fn(async () => {}), playSchedule: vi.fn(async () => {}), stop: vi.fn(async () => {}), pause: vi.fn(async () => {}), resume: vi.fn(async () => {}),
    };
    const controller = createPlaybackController({ adapter, onBeat });
    await controller.stop();
    expect(adapter.stop).toHaveBeenCalled();
    expect(onBeat).toHaveBeenCalledWith(0);
  });

  it('cursor beat update uses testable clock + frame loop', async () => {
    let now = 0;
    let callback: ((time: number) => void) | null = null;
    const adapter: PlaybackAdapter = {
      unlock: vi.fn(async () => {}), playSchedule: vi.fn(async () => {}), stop: vi.fn(async () => {}), pause: vi.fn(async () => {}), resume: vi.fn(async () => {}),
    };
    const onBeat = vi.fn();
    const controller = createPlaybackController({
      adapter,
      nowMs: () => now,
      requestFrame: (cb) => {
        callback = cb as (time: number) => void;
        return 1;
      },
      cancelFrame: () => {},
      onBeat,
    });
    await controller.play(makeProject(), { bpm: 120 });
    now = 500;
    (callback as ((time: number) => void) | null)?.(now);
    expect(onBeat).toHaveBeenCalledWith(1);
  });
});
