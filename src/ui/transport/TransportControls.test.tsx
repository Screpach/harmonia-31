import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useTransportStore } from '../../state/transport/transportStore';
import TransportControls from './TransportControls';

describe('TransportControls', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useTransportStore.setState({ bpm: 96, status: 'stopped', loopEnabled: false, volume: 0.7, currentBeat: 0 });
  });

  it('rejects non-positive BPM values in store validation', () => {
    expect(() => useTransportStore.getState().setBpm(0)).toThrow('BPM must be a positive number.');
  });

  it('buttons update transport state', () => {
    render(<TransportControls />);

    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(useTransportStore.getState().status).toBe('playing');

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(useTransportStore.getState().status).toBe('paused');

    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    expect(useTransportStore.getState().status).toBe('stopped');
  });

  it('renders accessible transport controls labels', () => {
    render(<TransportControls />);

    expect(screen.getByRole('form', { name: 'Transport controls' })).toBeTruthy();
    expect(screen.getByLabelText('BPM')).toBeTruthy();
    expect(screen.getByLabelText('Loop enabled')).toBeTruthy();
    expect(screen.getByLabelText('Volume')).toBeTruthy();
  });
});
