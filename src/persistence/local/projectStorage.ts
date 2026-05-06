import type { Project } from '../../domain/score/Project';
import { migrateProjectData } from '../../domain/schema/migrations';

export const LOCAL_PROJECT_STORAGE_KEY = 'harmonia31.current-project.v1';

export type BrowserStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export type ProjectStorage = {
  load(): Project | null;
  save(project: Project): void;
  clear(): void;
};

export function createProjectStorage(storage: BrowserStorage, key = LOCAL_PROJECT_STORAGE_KEY): ProjectStorage {
  return {
    load() {
      const raw = storage.getItem(key);
      if (!raw) return null;
      try {
        const parsed = JSON.parse(raw) as unknown;
        return migrateProjectData(parsed);
      } catch {
        return null;
      }
    },
    save(project) {
      storage.setItem(key, JSON.stringify(project));
    },
    clear() {
      storage.removeItem(key);
    },
  };
}

function hasLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function createBrowserProjectStorage(): ProjectStorage {
  if (!hasLocalStorage()) {
    return {
      load: () => null,
      save: () => {},
      clear: () => {},
    };
  }
  return createProjectStorage(window.localStorage);
}
