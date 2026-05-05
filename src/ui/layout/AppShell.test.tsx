import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AppShell from './AppShell';

describe('AppShell', () => {
  it('renders named layout regions', () => {
    render(<AppShell />);

    expect(screen.getByRole('banner', { name: 'Top bar' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Tools' })).toBeTruthy();
    expect(screen.getByRole('main', { name: 'Workspace' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Inspector' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Keyboard' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Transport' })).toBeTruthy();
  });
});
