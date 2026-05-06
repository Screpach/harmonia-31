import type { Project } from '../../domain/score/Project';

export function exportNativeProject(project: Project): string {
  return `${JSON.stringify(project, null, 2)}\n`;
}
