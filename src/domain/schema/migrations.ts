import { PROJECT_SCHEMA_VERSION } from '../score/Project';
import { validateProjectData, type ProjectData } from './projectSchema';

export class SchemaMigrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SchemaMigrationError';
  }
}

type MigrationFn = (input: unknown) => ProjectData;

const migrationRegistry: Record<number, MigrationFn> = {
  [PROJECT_SCHEMA_VERSION]: (input: unknown) => validateProjectData(input),
};

export function migrateProjectData(input: unknown): ProjectData {
  if (typeof input !== 'object' || input === null) {
    throw new SchemaMigrationError('Project payload must be an object.');
  }

  const version = (input as { schemaVersion?: unknown }).schemaVersion;
  if (typeof version !== 'number' || !Number.isInteger(version)) {
    throw new SchemaMigrationError('Project payload is missing an integer schemaVersion.');
  }

  const migrator = migrationRegistry[version];
  if (!migrator) {
    throw new SchemaMigrationError(`Unsupported project schemaVersion: ${version}.`);
  }

  return migrator(input);
}
