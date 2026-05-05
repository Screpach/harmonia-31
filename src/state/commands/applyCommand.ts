import type { Project } from '../../domain/score/Project';
import type { Command } from './Command';
import { applyDeleteEvent, applyInsertNote, applyUpdateNotePitch } from './noteCommands';

export function applyCommand(project: Project, command: Command): Project {
  switch (command.kind) {
    case 'noop':
      return project;
    case 'insert-note':
      return applyInsertNote(project, command);
    case 'delete-event':
      return applyDeleteEvent(project, command);
    case 'update-note-pitch':
      return applyUpdateNotePitch(project, command);
    default: {
      const exhaustive: never = command;
      return exhaustive;
    }
  }
}
