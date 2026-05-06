import { frequencyOfPitch } from '../../domain/tuning/frequency';
import type { ThirtyOneEdoTuning } from '../../domain/tuning/TuningSystem';
import { VOICE_IDS } from '../../domain/voice/Voice';
import type { Project } from '../../domain/score/Project';
import type { ScoreEvent } from '../../domain/score/Event';
import type { AudioEvent } from './AudioEvent';

const DEFAULT_VELOCITY = 0.7;

function rationalToBeats(numerator: number, denominator: number, beatUnit: number): number {
  return (numerator / denominator) * beatUnit;
}

function compareScheduledEvents(a: AudioEvent, b: AudioEvent): number {
  if (a.startBeat !== b.startBeat) return a.startBeat - b.startBeat;
  const voiceDelta = VOICE_IDS.indexOf(a.voiceId) - VOICE_IDS.indexOf(b.voiceId);
  if (voiceDelta !== 0) return voiceDelta;
  return a.eventId.localeCompare(b.eventId);
}

export function createAudioSchedule(
  project: Project,
  options: { tuning?: ThirtyOneEdoTuning; velocity?: number } = {},
): AudioEvent[] {
  const beatUnit = project.score.timeSignature.denominator;
  const beatsPerMeasure = project.score.timeSignature.numerator;
  const secondsPerBeat = 60 / project.score.tempoBpm;
  const tuning = options.tuning ?? project.tuning;
  const velocity = options.velocity ?? DEFAULT_VELOCITY;

  const scheduled = project.score.measures.flatMap((measure) =>
    measure.events.flatMap((event): AudioEvent[] => {
      if (event.kind !== 'note') return [];
      return [toAudioEvent(event, measure.index, beatsPerMeasure, beatUnit, secondsPerBeat, tuning, velocity)];
    }),
  );

  return [...scheduled].sort(compareScheduledEvents);
}

function toAudioEvent(
  event: Extract<ScoreEvent, { kind: 'note' }>,
  measureIndex: number,
  beatsPerMeasure: number,
  beatUnit: number,
  secondsPerBeat: number,
  tuning: ThirtyOneEdoTuning,
  velocity: number,
): AudioEvent {
  const startBeat = measureIndex * beatsPerMeasure + rationalToBeats(event.onset.numerator, event.onset.denominator, beatUnit);
  const durationBeats = rationalToBeats(event.duration.numerator, event.duration.denominator, beatUnit);

  return {
    eventId: event.id,
    voiceId: event.voiceId,
    frequencyHz: frequencyOfPitch(event.pitch, tuning),
    startBeat,
    startTimeSec: startBeat * secondsPerBeat,
    durationBeats,
    durationSec: durationBeats * secondsPerBeat,
    velocity,
  };
}
