import * as Tone from 'tone';
import type { PlaybackAdapter } from '../PlaybackAdapter';
import type { AudioEvent } from '../schedule/AudioEvent';

export type ToneLike = Pick<typeof Tone, 'start' | 'getTransport' | 'Synth'>;

export class TonePlaybackAdapter implements PlaybackAdapter {
  private readonly tone: ToneLike;

  private readonly synth: InstanceType<typeof Tone.Synth>;

  constructor(tone: ToneLike = Tone) {
    this.tone = tone;
    this.synth = new this.tone.Synth().toDestination();
  }

  async unlock(): Promise<void> {
    await this.tone.start();
  }

  async playSchedule(events: readonly AudioEvent[], options: { fromBeat?: number } = {}): Promise<void> {
    const fromBeat = options.fromBeat ?? 0;
    const transport = this.tone.getTransport();
    transport.cancel();

    events
      .filter((event) => event.startBeat >= fromBeat)
      .forEach((event) => {
        const timeSec = event.startTimeSec - fromBeat * (60 / transport.bpm.value);
        transport.schedule((time) => {
          this.synth.triggerAttackRelease(event.frequencyHz, event.durationSec, time, event.velocity);
        }, timeSec);
      });

    transport.start();
  }

  async stop(): Promise<void> {
    const transport = this.tone.getTransport();
    transport.stop();
    transport.cancel();
  }

  async pause(): Promise<void> {
    this.tone.getTransport().pause();
  }

  async resume(): Promise<void> {
    this.tone.getTransport().start();
  }
}
