import type { ScoreEvent } from '../../domain/score/Event';
import type { Project } from '../../domain/score/Project';
import type { DeleteEventCommand, InsertNoteCommand, UpdateNotePitchCommand } from './Command';

function updateProjectMeasures(project: Project, updater: (events: readonly ScoreEvent[]) => readonly ScoreEvent[], measureId: string): Project {
  const nextMeasures = project.score.measures.map((measure) => {
    if (measure.id !== measureId) {
      return measure;
    }

    return {
      ...measure,
      events: updater(measure.events),
    };
  });

  return {
    ...project,
    score: {
      ...project.score,
      measures: nextMeasures,
    },
  };
}

export function applyInsertNote(project: Project, command: InsertNoteCommand): Project {
  return updateProjectMeasures(
    project,
    (events) => [
      ...events,
      {
        id: command.eventId,
        kind: 'note',
        voiceId: command.voiceId,
        onset: command.onset,
        duration: command.duration,
        pitch: command.pitch,
      },
    ],
    command.measureId,
  );
}

export function applyDeleteEvent(project: Project, command: DeleteEventCommand): Project {
  return updateProjectMeasures(
    project,
    (events) => events.filter((event) => event.id !== command.eventId),
    command.measureId,
  );
}

export function applyUpdateNotePitch(project: Project, command: UpdateNotePitchCommand): Project {
  return updateProjectMeasures(
    project,
    (events) =>
      events.map((event) => {
        if (event.id !== command.eventId || event.kind !== 'note') {
          return event;
        }

        return {
          ...event,
          pitch: command.pitch,
        };
      }),
    command.measureId,
  );
}
