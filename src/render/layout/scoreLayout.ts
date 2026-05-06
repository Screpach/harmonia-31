import type { Rational } from '../../domain/duration/Rational';
import type { Project } from '../../domain/score/Project';
import type { VoiceId } from '../../domain/voice/Voice';
import type { CursorAnchor, EventLayout, LayoutOptions, MeasureLayout, ScoreLayout, StaveLayout } from './LayoutTypes';

const STAFF_HEIGHT = 56;
const STAFF_GAP = 12;
const EVENT_WIDTH = 10;
const EVENT_HEIGHT = 16;
const PADDING = 12;

function rationalToNumber(value: Rational): number {
  return value.numerator / value.denominator;
}

function yForVoice(voices: readonly VoiceId[], voiceId: VoiceId): number {
  const index = voices.indexOf(voiceId);
  return PADDING + index * (STAFF_HEIGHT + STAFF_GAP);
}

export function layoutScore(project: Project, options: LayoutOptions): ScoreLayout {
  const zoom = options.zoom ?? 1;
  const width = options.width;
  const voices = project.score.voices;
  const measureCount = Math.max(project.score.measures.length, 1);
  const measureWidth = Math.max(40, (width - PADDING * 2) / measureCount);

  const staves: StaveLayout[] = voices.map((voiceId) => ({
    voiceId,
    bounds: {
      x: PADDING,
      y: yForVoice(voices, voiceId),
      width: width - PADDING * 2,
      height: STAFF_HEIGHT,
    },
  }));

  const measures: MeasureLayout[] = project.score.measures.map((measure, index) => ({
    measureId: measure.id,
    index,
    bounds: {
      x: PADDING + index * measureWidth,
      y: PADDING,
      width: measureWidth,
      height: voices.length * (STAFF_HEIGHT + STAFF_GAP) - STAFF_GAP,
    },
  }));

  const events: EventLayout[] = [];
  const cursorAnchors: CursorAnchor[] = [];

  for (const measure of project.score.measures) {
    const measureLayout = measures.find((m) => m.measureId === measure.id);
    if (!measureLayout) {
      continue;
    }

    for (const event of measure.events) {
      const x = measureLayout.bounds.x + rationalToNumber(event.onset) * measureLayout.bounds.width * zoom;
      const y = yForVoice(voices, event.voiceId) + (STAFF_HEIGHT - EVENT_HEIGHT) / 2;

      events.push({
        eventId: event.id,
        measureId: measure.id,
        voiceId: event.voiceId,
        kind: event.kind,
        bounds: {
          x,
          y,
          width: EVENT_WIDTH * zoom,
          height: EVENT_HEIGHT * zoom,
        },
      });

      cursorAnchors.push({
        voiceId: event.voiceId,
        measureId: measure.id,
        x,
        y,
      });
    }
  }

  return {
    width,
    zoom,
    staves,
    measures,
    events,
    cursorAnchors,
  };
}
