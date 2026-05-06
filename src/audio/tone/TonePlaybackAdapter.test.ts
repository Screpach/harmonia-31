import { describe, expect, it, vi } from 'vitest';
import { TonePlaybackAdapter } from './TonePlaybackAdapter';
import type { AudioEvent } from '../schedule/AudioEvent';

function makeToneMock() {
  const schedule = vi.fn();
  const start = vi.fn();
  const stop = vi.fn();
  const pause = vi.fn();
  const cancel = vi.fn();
  const triggerAttackRelease = vi.fn();

  const transport = {
    schedule,
    start,
    stop,
    pause,
    cancel,
    bpm: { value: 120 },
  };

  class Synth {
    toDestination() {
      return this;
    }

    triggerAttackRelease = triggerAttackRelease;
  }

  return {
    start: vi.fn(async () => {}),
    getTransport: vi.fn(() => transport),
    Synth,
    spies: { schedule, start, stop, pause, cancel, triggerAttackRelease },
  };
}

describe('TonePlaybackAdapter', () => {
  it('maps schedule frequencies to Tone synth events', async () => {
    const toneMock = makeToneMock();
    const adapter = new TonePlaybackAdapter(toneMock as never);

    const events: AudioEvent[] = [
      {
        eventId: 'a1',
        voiceId: 'soprano',
        frequencyHz: 444.4,
        startBeat: 0,
        startTimeSec: 0,
        durationBeats: 1,
        durationSec: 0.5,
        velocity: 0.8,
      },
    ];

    await adapter.playSchedule(events);

    expect(toneMock.spies.cancel).toHaveBeenCalled();
    expect(toneMock.spies.schedule).toHaveBeenCalledTimes(1);

    const callback = toneMock.spies.schedule.mock.calls[0]![0] as (time: number) => void;
    callback(0);

    expect(toneMock.spies.triggerAttackRelease).toHaveBeenCalledWith(444.4, 0.5, 0, 0.8);
  });

  it('supports unlock/pause/resume/stop without autoplay', async () => {
    const toneMock = makeToneMock();
    const adapter = new TonePlaybackAdapter(toneMock as never);

    await adapter.unlock();
    await adapter.pause();
    await adapter.resume();
    await adapter.stop();

    expect(toneMock.start).toHaveBeenCalledTimes(1);
    expect(toneMock.spies.pause).toHaveBeenCalledTimes(1);
    expect(toneMock.spies.start).toHaveBeenCalledTimes(1);
    expect(toneMock.spies.stop).toHaveBeenCalledTimes(1);
  });
});
