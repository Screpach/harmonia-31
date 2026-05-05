import LayoutRegion from './LayoutRegion';

function AppShell() {
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
        />

        <main className="region workspace" aria-label="Workspace">
          <h2>Workspace</h2>
          <p>
            Central notation-like editing and analysis canvas placeholder. Domain rules remain deferred as{' '}
            <code>awaiting-private-rule-pack</code>.
          </p>
        </main>

        <LayoutRegion
          className="region inspector"
          title="Inspector"
          description="Right panel placeholder for context details, validation, and selection metadata."
        />
      </div>

      <div className="footer-grid">
        <LayoutRegion
          className="region keyboard"
          title="Keyboard"
          description="On-screen keyboard placeholder for future audition and input mapping."
        />
        <LayoutRegion
          className="region transport"
          title="Transport"
          description="Playback transport placeholder for start, stop, tempo, and loop controls."
        />
      </div>
    </div>
  );
}

export default AppShell;
