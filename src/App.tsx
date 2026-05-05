import AppShell from './ui/layout/AppShell';
import InspectorPanel from './ui/inspector/InspectorPanel';
import Edo31Keyboard from './ui/keyboard/Edo31Keyboard';
import SatbGrid from './ui/score/SatbGrid';
import { createDemoProject } from './ui/score/demoProject';

function App() {
  const project = createDemoProject();

  return <AppShell workspaceContent={<SatbGrid project={project} />} inspectorContent={<InspectorPanel project={project} />} keyboardContent={<Edo31Keyboard />} />;
}

export default App;
