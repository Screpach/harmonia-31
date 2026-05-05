import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Edo31Keyboard from './Edo31Keyboard';

describe('Edo31Keyboard', () => {
  afterEach(() => cleanup());
  it('renders exactly 31 key buttons', () => {
    render(<Edo31Keyboard />);
    expect(screen.getAllByRole('button')).toHaveLength(31);
  });

  it('renders C# and Db as separate adjacent keys from canonical mapping', () => {
    render(<Edo31Keyboard />);
    const buttons = screen.getAllByRole('button');
    const labels = buttons.map((button) => button.textContent ?? '');
    const cSharpIndex = labels.findIndex((label) => label.includes('C#'));
    const dbIndex = labels.findIndex((label) => label.includes('Db'));

    expect(cSharpIndex).toBeGreaterThan(-1);
    expect(dbIndex).toBe(cSharpIndex + 1);
  });

  it('emits onKeyPress with step and spelling', () => {
    const onKeyPress = vi.fn();
    render(<Edo31Keyboard onKeyPress={onKeyPress} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Step 2: C#' })[0]);
    expect(onKeyPress).toHaveBeenCalledWith({ step: 2, spelling: 'C#' });
  });
});
