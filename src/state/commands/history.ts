import type { Project } from '../../domain/score/Project';
import type { Command } from './Command';
import { applyCommand } from './applyCommand';

export type HistoryState = {
  readonly past: readonly Project[];
  readonly present: Project;
  readonly future: readonly Project[];
};

export function createHistoryState(initialProject: Project): HistoryState {
  return {
    past: [],
    present: initialProject,
    future: [],
  };
}

export function applyWithHistory(state: HistoryState, command: Command): HistoryState {
  const nextProject = applyCommand(state.present, command);

  return {
    past: [...state.past, state.present],
    present: nextProject,
    future: [],
  };
}

export function undo(state: HistoryState): HistoryState {
  if (state.past.length === 0) {
    return state;
  }

  const previous = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: previous,
    future: [state.present, ...state.future],
  };
}

export function redo(state: HistoryState): HistoryState {
  if (state.future.length === 0) {
    return state;
  }

  const [next, ...future] = state.future;
  return {
    past: [...state.past, state.present],
    present: next,
    future,
  };
}
