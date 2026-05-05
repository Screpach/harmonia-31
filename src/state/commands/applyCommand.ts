import type { Project } from '../../domain/score/Project';
import type { Command } from './Command';

export function applyCommand(project: Project, command: Command): Project {
  if (command.kind === 'noop') {
    return project;
  }

  return project;
}
