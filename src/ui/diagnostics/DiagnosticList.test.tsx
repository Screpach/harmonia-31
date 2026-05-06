import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createDiagnostic } from '../../engine/diagnostics/Diagnostic';
import { atEvent } from '../../engine/diagnostics/locations';
import DiagnosticList from './DiagnosticList';

describe('DiagnosticList', () => {
  it('renders empty state', () => {
    render(<DiagnosticList diagnostics={[]} />);
    expect(screen.getByText(/No diagnostics/)).toBeTruthy();
  });

  it('renders warning and error states', () => {
    const warning = createDiagnostic({ severity: 'warning', category: 'spacing', message: 'Warn', beginnerExplanation: 'b', technicalExplanation: 't', locations: [atEvent('m1', 'e1', 'alto')], provenance: { source: 'analyzer', analyzerId: 'x' } });
    const error = createDiagnostic({ severity: 'error', category: 'voice-leading', message: 'Err', beginnerExplanation: 'b', technicalExplanation: 't', locations: [atEvent('m1', 'e2', 'soprano')], provenance: { source: 'analyzer', analyzerId: 'x' } });
    render(<DiagnosticList diagnostics={[warning, error]} />);
    expect(screen.getByText('Warn')).toBeTruthy();
    expect(screen.getByText('Err')).toBeTruthy();
    expect(screen.getAllByLabelText(/diagnostic/).length).toBe(2);
  });
});
