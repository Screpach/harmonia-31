import { absoluteStep31 } from '../../../domain/tuning/frequency';
import { createDiagnostic } from '../../diagnostics/Diagnostic';
import { atEvent } from '../../diagnostics/locations';
import type { RulePlugin } from '../RulePlugin';

const ORDER = ['soprano', 'alto', 'tenor', 'bass'] as const;

export const voiceOrderRule: RulePlugin = {
  id: 'builtin.voice-order',
  version: '0.1.0',
  modes: ['mechanical'],
  requiredData: { kind: 'none' },
  analyze(context) {
    const diagnostics = context.project.score.measures.flatMap((measure) => {
      const notes = measure.events.filter((event): event is Extract<typeof event, { kind: 'note' }> => event.kind === 'note');
      const byOnset = new Map<string, typeof notes>();
      for (const note of notes) {
        const key = `${note.onset.numerator}/${note.onset.denominator}`;
        byOnset.set(key, [...(byOnset.get(key) ?? []), note]);
      }
      return [...byOnset.values()].flatMap((chord) => {
        const sorted = ORDER.map((voiceId) => chord.find((n) => n.voiceId === voiceId)).filter(Boolean) as typeof notes;
        const out: ReturnType<typeof createDiagnostic>[] = [];
        for (let i = 0; i < sorted.length - 1; i += 1) {
          const upper = sorted[i];
          const lower = sorted[i + 1];
          if (!upper || !lower) continue;
          if (absoluteStep31(upper.pitch) < absoluteStep31(lower.pitch)) {
            out.push(createDiagnostic({
              severity: 'warning',
              category: 'voice-leading',
              message: `Voice crossing between ${upper.voiceId} and ${lower.voiceId}.`,
              beginnerExplanation: 'An upper voice is below a lower voice at the same moment.',
              technicalExplanation: 'Mechanical voice-order check found upperStep < lowerStep at comparable onset.',
              locations: [atEvent(measure.id, upper.id, upper.voiceId), atEvent(measure.id, lower.id, lower.voiceId)],
              provenance: { source: 'analyzer', analyzerId: 'builtin.voice-order' },
            }));
          }
        }
        return out;
      });
    });
    return { status: 'ok', diagnostics };
  },
};
