import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '../../state/useAppStore';
import SatbGrid from './SatbGrid';

describe('SatbGrid', () => {
  beforeEach(() => {
    useAppStore.getState().clearSelection();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders all four voice labels', () => {
    render(<SatbGrid />);

    expect(screen.getByRole('rowheader', { name: 'soprano' })).toBeTruthy();
    expect(screen.getByRole('rowheader', { name: 'alto' })).toBeTruthy();
    expect(screen.getByRole('rowheader', { name: 'tenor' })).toBeTruthy();
    expect(screen.getByRole('rowheader', { name: 'bass' })).toBeTruthy();
  });

  it('keeps C# and Db labels distinct', () => {
    render(<SatbGrid />);

    expect(screen.getAllByText('C#4').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Db4').length).toBeGreaterThan(0);
  });

  it('clicking a note cell selects matching event id and highlights cell without score mutation', () => {
    render(<SatbGrid />);

    const sopranoCell = screen.getAllByText('C#4')[0];
    fireEvent.click(sopranoCell);

    expect(useAppStore.getState().selectedEventIds).toEqual(['e-s-csharp']);
    expect(sopranoCell.closest('span')?.getAttribute('data-selected')).toBe('true');
    expect(screen.getByText('C#4')).toBeTruthy();
    expect(screen.getByText('Db4')).toBeTruthy();
  });
});
