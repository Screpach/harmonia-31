import { create } from 'zustand';
import type { Project } from '../domain/score/Project';
import { normalizeRational } from '../domain/duration/Rational';
import { makeSpelledPitch } from '../domain/pitch/SpelledPitch';
import { createEmptyProject } from '../domain/score/createEmptyProject';
import { createBrowserProjectStorage } from '../persistence/local/projectStorage';
import type { Command, InsertNoteCommand, UpdateNotePitchCommand } from './commands/Command';
import { applyWithHistory, createHistoryState, type HistoryState } from './commands/history';

function initialProject(): Project {
  const base = createEmptyProject('demo-project', 'SATB Grid Demo');
  return {
    ...base,
    score: { ...base.score, measures: [{ id: 'm1', index: 0, events: [
      { id: 'e-s-csharp', kind: 'note', voiceId: 'soprano', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }) },
      { id: 'e-a-db', kind: 'note', voiceId: 'alto', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }) },
    ] }] },
  };
}


const projectStorage = createBrowserProjectStorage();

function loadInitialProject(): Project {
  return projectStorage.load() ?? initialProject();
}

let persistTimeout: ReturnType<typeof setTimeout> | null = null;

function persistProject(project: Project): void {
  if (persistTimeout) clearTimeout(persistTimeout);
  persistTimeout = setTimeout(() => projectStorage.save(project), 120);
}
type ProjectStore = {
  history: HistoryState;
  apply: (command: Command) => void;
  replaceProject: (project: Project) => void;
  applyKeyboardPitch: (spelledPitch: { letter: 'A'|'B'|'C'|'D'|'E'|'F'|'G'; accidental: number; octave: number }, args: { activeVoice: 'soprano'|'alto'|'tenor'|'bass'; selectedEventId: string | null }) => void;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  history: createHistoryState(loadInitialProject()),
  apply: (command) => set((state) => {
    const history = applyWithHistory(state.history, command);
    persistProject(history.present);
    return { history };
  }),
  replaceProject: (project) => set(() => {
    persistProject(project);
    return { history: createHistoryState(project) };
  }),
  applyKeyboardPitch: (spelledPitch, args) => {
    const history = get().history;
    const measureId = history.present.score.measures[0]?.id ?? 'm1';
    const command: InsertNoteCommand | UpdateNotePitchCommand = args.selectedEventId
      ? {
          kind: 'update-note-pitch',
          meta: { commandId: `cmd-${Date.now()}`, issuedAt: new Date().toISOString(), source: 'user' },
          measureId,
          eventId: args.selectedEventId,
          pitch: makeSpelledPitch(spelledPitch),
        }
      : {
          kind: 'insert-note',
          meta: { commandId: `cmd-${Date.now()}`, issuedAt: new Date().toISOString(), source: 'user' },
          measureId,
          eventId: `event-${Date.now()}`,
          voiceId: args.activeVoice,
          onset: normalizeRational({ numerator: 0, denominator: 1 }),
          duration: normalizeRational({ numerator: 1, denominator: 4 }),
          pitch: makeSpelledPitch(spelledPitch),
        };
    set((state) => {
      const history = applyWithHistory(state.history, command);
      persistProject(history.present);
      return { history };
    });
  },
}));
