import { describe, expect, it } from 'vitest';
import { SHORTCUT_REGISTRY } from './shortcutRegistry';
import { isEditableTarget } from './useKeyboardShortcuts';

describe('shortcut registry', () => {
  it('has unique shortcut ids', () => {
    const ids = SHORTCUT_REGISTRY.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ignores editable targets', () => {
    const input = document.createElement('input');
    const div = document.createElement('div');

    expect(isEditableTarget(input)).toBe(true);
    expect(isEditableTarget(div)).toBe(false);
  });
});
