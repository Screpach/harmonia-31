import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <span>theme-child</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('theme-child')).toBeTruthy();
  });
});
