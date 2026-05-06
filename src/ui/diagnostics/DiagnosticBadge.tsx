import type { DiagnosticSeverity } from '../../engine/diagnostics/Diagnostic';

type DiagnosticBadgeProps = { severity: DiagnosticSeverity };

function DiagnosticBadge({ severity }: DiagnosticBadgeProps) {
  return <span className={`diag-badge diag-badge--${severity}`} aria-label={`diagnostic ${severity}`}>{severity}</span>;
}

export default DiagnosticBadge;
