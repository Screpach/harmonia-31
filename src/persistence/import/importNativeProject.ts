import { migrateProjectData, SchemaMigrationError } from '../../domain/schema/migrations';
import type { Project } from '../../domain/score/Project';

export class ImportNativeProjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImportNativeProjectError';
  }
}

export function importNativeProject(input: string): Project {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    throw new ImportNativeProjectError('Invalid JSON. Please provide a valid Harmonia 31 project JSON file.');
  }

  try {
    return migrateProjectData(parsed);
  } catch (error) {
    if (error instanceof SchemaMigrationError) {
      throw new ImportNativeProjectError(`Unsupported or invalid project schema: ${error.message}`);
    }
    throw new ImportNativeProjectError('Project data could not be imported due to schema validation failure.');
  }
}
