import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App smoke test', () => {
  it('renders Harmonia 31 heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Harmonia 31' })).toBeTruthy();
  });
});
