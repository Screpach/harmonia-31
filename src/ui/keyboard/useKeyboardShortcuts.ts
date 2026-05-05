import { useEffect } from 'react';
import { useAppStore } from '../../state/useAppStore';
import { ACTION_TO_VOICE, SHORTCUT_REGISTRY } from './shortcutRegistry';

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || Boolean(target.isContentEditable);
}

export function useKeyboardShortcuts(): void {
  const setActiveVoice = useAppStore((state) => state.setActiveVoice);
  const toggleInspectorVisible = useAppStore((state) => state.toggleInspectorVisible);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if (isEditableTarget(event.target)) {
        return;
      }

      const shortcut = SHORTCUT_REGISTRY.find((entry) => entry.key.toLowerCase() === event.key.toLowerCase());
      if (!shortcut) {
        return;
      }

      if (shortcut.action in ACTION_TO_VOICE) {
        setActiveVoice(ACTION_TO_VOICE[shortcut.action as keyof typeof ACTION_TO_VOICE]);
        event.preventDefault();
        return;
      }

      if (shortcut.action === 'ui.toggleInspector') {
        toggleInspectorVisible();
        event.preventDefault();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setActiveVoice, toggleInspectorVisible]);
}
