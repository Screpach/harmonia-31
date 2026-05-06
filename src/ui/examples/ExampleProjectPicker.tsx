import { SYNTHETIC_EXAMPLE_PROJECTS } from '../../domain/examples/syntheticProjects';
import { useProjectStore } from '../../state/projectStore';

function ExampleProjectPicker() {
  const replaceProject = useProjectStore((state) => state.replaceProject);

  return (
    <section aria-label="Synthetic example picker">
      <h3>Synthetic Examples</h3>
      <ul>
        {SYNTHETIC_EXAMPLE_PROJECTS.map((example) => (
          <li key={example.id}>
            <button type="button" onClick={() => replaceProject(example.project)}>{example.label}</button>
            <p>{example.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ExampleProjectPicker;
