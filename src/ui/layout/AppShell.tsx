import type { ReactNode } from 'react';
import { useKeyboardShortcuts } from '../keyboard/useKeyboardShortcuts';
import { selectInspectorVisible, useAppStore } from '../../state/useAppStore';
import SettingsDebugPanel from '../settings/SettingsDebugPanel';
import ProjectFileControls from '../file/ProjectFileControls';
import ExampleProjectPicker from '../examples/ExampleProjectPicker';
import LayoutRegion from './LayoutRegion';

type AppShellProps = {
  workspaceContent?: ReactNode;
  inspectorContent?: ReactNode;
  keyboardContent?: ReactNode;
  transportContent?: ReactNode;
};

function AppShell({ workspaceContent, inspectorContent, keyboardContent, transportContent }: AppShellProps) {
  useKeyboardShortcuts();
  const inspectorVisible = useAppStore(selectInspectorVisible);

  return (
    <div className="app-shell" aria-label="Harmonia 31 application shell">
      <header className="top-bar" aria-label="Top bar">
        <h1>Harmonia 31</h1>
        <p>31-EDO SATB workspace scaffold (no musical logic yet).</p>
      </header>

      <div className="layout-grid">
        <LayoutRegion
          className="region tools"
          title="Tools"
          description="Left panel placeholder for analysis, generation, and editing tools."
        >
          <SettingsDebugPanel />
          <ProjectFileControls />
          <ExampleProjectPicker />
        </LayoutRegion>

        <main className="region workspace" aria-label="Workspace">
          <h2>Workspace</h2>
          {workspaceContent ?? (
            <p>
              Central notation-like editing and analysis canvas placeholder. Domain rules remain deferred as{' '}
              <code>awaiting-private-rule-pack</code>.
            </p>
          )}
        </main>

        {inspectorVisible ? (
          <LayoutRegion
            className="region inspector"
            title="Inspector"
            description="Right panel placeholder for context details, validation, and selection metadata."
          >
            {inspectorContent ?? <p>No selection data.</p>}
          </LayoutRegion>
        ) : (
          <section className="region inspector" aria-label="Inspector hidden">
            <h2>Inspector hidden</h2>
            <p>Use Settings (debug) to show the inspector panel again.</p>
          </section>
        )}
      </div>

      <div className="footer-grid">
        <LayoutRegion
          className="region keyboard"
          title="Keyboard"
          description="On-screen keyboard placeholder for future audition and input mapping."
        >
          {keyboardContent ?? <p>Keyboard placeholder.</p>}
        </LayoutRegion>
        <LayoutRegion
          className="region transport"
          title="Transport"
          description="Playback transport placeholder for start, stop, tempo, and loop controls."
        >
          {transportContent ?? <p>Transport controls placeholder.</p>}
        </LayoutRegion>
      </div>
    </div>
  );
}

export default AppShell;
