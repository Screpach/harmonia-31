import AppShell from './ui/layout/AppShell';
import InspectorPanel from './ui/inspector/InspectorPanel';
import SatbGrid from './ui/score/SatbGrid';
import { createDemoProject } from './ui/score/demoProject';

function App() {
  const project = createDemoProject();

  return <AppShell workspaceContent={<SatbGrid project={project} />} inspectorContent={<InspectorPanel project={project} />} />;
}

export default App;
