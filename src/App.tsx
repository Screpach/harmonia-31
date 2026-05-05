import AppShell from './ui/layout/AppShell';
import InspectorPanel from './ui/inspector/InspectorPanel';
import Edo31Keyboard from './ui/keyboard/Edo31Keyboard';
import SatbGrid from './ui/score/SatbGrid';
import { useAppStore } from './state/useAppStore';
import { useProjectStore } from './state/projectStore';

function toSpelledPitch(spelling: string): { letter: 'A'|'B'|'C'|'D'|'E'|'F'|'G'; accidental: number; octave: number } | null {
  const letter = spelling[0] as 'A'|'B'|'C'|'D'|'E'|'F'|'G';
  const accidental = spelling.includes('#') ? 1 : spelling.includes('b') ? -1 : 0;
  if (!['A','B','C','D','E','F','G'].includes(letter)) return null;
  if (spelling.includes('↑') || spelling.includes('↓')) return null;
  return { letter, accidental, octave: 4 };
}

function App() {
  const project = useProjectStore((state) => state.history.present);
  const applyKeyboardPitch = useProjectStore((state) => state.applyKeyboardPitch);
  const activeVoice = useAppStore((state) => state.activeVoice);
  const selectedEventId = useAppStore((state) => state.selectedEventIds[0] ?? null);

  return <AppShell workspaceContent={<SatbGrid />} inspectorContent={<InspectorPanel project={project} />} keyboardContent={<Edo31Keyboard onKeyPress={({ spelling }) => {
    const pitch = toSpelledPitch(spelling);
    if (!pitch) return;
    applyKeyboardPitch(pitch, { activeVoice, selectedEventId });
  }} />} />;
}

export default App;
