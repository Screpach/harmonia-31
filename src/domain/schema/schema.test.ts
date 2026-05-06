import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../score/createEmptyProject';
import { migrateProjectData, SchemaMigrationError } from './migrations';
import { validateProjectData } from './projectSchema';

describe('project schema and migrations', () => {
  it('valid empty project passes schema', () => {
    const project = createEmptyProject('project-schema-001');
    expect(() => validateProjectData(project)).not.toThrow();
  });

  it('malformed pitch fails validation', () => {
    const project = createEmptyProject('project-schema-002');
    const malformed = {
      ...project,
      tuning: {
        ...project.tuning,
        referencePitch: {
          ...project.tuning.referencePitch,
          letter: 'H',
        },
      },
    };

    expect(() => validateProjectData(malformed)).toThrow();
  });

  it('unknown future schema version produces controlled error', () => {
    const project = createEmptyProject('project-schema-003');
    const future = { ...project, schemaVersion: 999 };

    expect(() => migrateProjectData(future)).toThrowError(SchemaMigrationError);
    expect(() => migrateProjectData(future)).toThrowError('Unsupported project schemaVersion: 999.');
  });

  it('current version migration is idempotent', () => {
    const project = createEmptyProject('project-schema-004');
    const once = migrateProjectData(project);
    const twice = migrateProjectData(once);

    expect(twice).toEqual(once);
  });
});
