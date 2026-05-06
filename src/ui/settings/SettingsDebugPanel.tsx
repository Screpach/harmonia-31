import { VOICE_OPTIONS } from '../../state/appSettings';
import {
  selectActiveVoice,
  selectInspectorVisible,
  selectTempoBpm,
  useAppStore,
} from '../../state/useAppStore';

function SettingsDebugPanel() {
  const activeVoice = useAppStore(selectActiveVoice);
  const inspectorVisible = useAppStore(selectInspectorVisible);
  const tempoBpm = useAppStore(selectTempoBpm);
  const setActiveVoice = useAppStore((state) => state.setActiveVoice);
  const setTempoBpm = useAppStore((state) => state.setTempoBpm);
  const toggleInspectorVisible = useAppStore((state) => state.toggleInspectorVisible);

  return (
    <section aria-label="Settings debug panel">
      <h3>Settings (debug)</h3>
      <label>
        Active voice
        <select value={activeVoice} onChange={(event) => setActiveVoice(event.target.value as (typeof VOICE_OPTIONS)[number])}>
          {VOICE_OPTIONS.map((voice) => (
            <option key={voice} value={voice}>
              {voice}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tempo (BPM)
        <input
          type="number"
          min={20}
          max={240}
          value={tempoBpm}
          onChange={(event) => setTempoBpm(Number(event.target.value))}
        />
      </label>
      <button type="button" onClick={toggleInspectorVisible}>
        Inspector: {inspectorVisible ? 'visible' : 'hidden'}
      </button>
      <p>Refresh persistence is not implemented yet.</p>
    </section>
  );
}

export default SettingsDebugPanel;
