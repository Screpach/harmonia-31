import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SatbGrid from './SatbGrid';

describe('SatbGrid', () => {
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
});
