import { useState } from 'react';
import { exportNativeProject } from '../../persistence/export/exportNativeProject';
import { importNativeProject } from '../../persistence/import/importNativeProject';
import { useProjectStore } from '../../state/projectStore';

function ProjectFileControls() {
  const project = useProjectStore((state) => state.history.present);
  const replaceProject = useProjectStore((state) => state.replaceProject);
  const [message, setMessage] = useState<string>('');

  const handleExport = () => {
    const text = exportNativeProject(project);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${project.id}.harmonia31.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('Project exported.');
  };

  return (
    <section aria-label="Project file controls">
      <button type="button" aria-label="Export JSON" onClick={handleExport}>Export JSON</button>
      <label>
        Import JSON
        <input
          aria-label="Import JSON"
          type="file"
          accept="application/json,.json"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            try {
              const imported = importNativeProject(text);
              replaceProject(imported);
              setMessage('Project imported.');
            } catch (error) {
              const detail = error instanceof Error ? error.message : 'Unknown error.';
              setMessage(`Import failed: ${detail}`);
            }
          }}
        />
      </label>
      <p aria-live="polite">{message}</p>
    </section>
  );
}

export default ProjectFileControls;
