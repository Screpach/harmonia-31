import { DEFAULT_31EDO_TUNING } from '../tuning/TuningSystem';
import { VOICE_IDS } from '../voice/Voice';
import { PROJECT_SCHEMA_VERSION, type Project } from './Project';

const DEFAULT_TEMPO_BPM = 96;
const DEFAULT_TIME_SIGNATURE = { numerator: 4, denominator: 4 } as const;

export function createEmptyProject(projectId: string, title = 'Untitled Harmonia 31 Project'): Project {
  const timestamp = new Date().toISOString();

  return Object.freeze({
    schemaVersion: PROJECT_SCHEMA_VERSION,
    id: projectId,
    title,
    tuning: DEFAULT_31EDO_TUNING,
    score: {
      tempoBpm: DEFAULT_TEMPO_BPM,
      timeSignature: DEFAULT_TIME_SIGNATURE,
      voices: VOICE_IDS,
      measures: [],
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}
