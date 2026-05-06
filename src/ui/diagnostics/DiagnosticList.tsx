import type { Diagnostic } from '../../engine/diagnostics/Diagnostic';
import DiagnosticBadge from './DiagnosticBadge';

type DiagnosticListProps = { diagnostics: readonly Diagnostic[] };

function DiagnosticList({ diagnostics }: DiagnosticListProps) {
  if (diagnostics.length === 0) {
    return <p>No diagnostics for current project snapshot.</p>;
  }

  return (
    <ul aria-label="Diagnostic list">
      {diagnostics.map((diagnostic) => (
        <li key={diagnostic.id}>
          <DiagnosticBadge severity={diagnostic.severity} /> {diagnostic.message}
          <div>
            <small>
              {diagnostic.locations[0]?.voiceId ?? 'voice:n/a'} • {diagnostic.locations[0]?.eventId ?? 'event:n/a'} • {diagnostic.provenance.source}
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DiagnosticList;
