import { create } from 'zustand';

export type TransportStatus = 'stopped' | 'playing' | 'paused';

export type TransportStore = {
  readonly bpm: number;
  readonly status: TransportStatus;
  readonly loopEnabled: boolean;
  readonly volume: number;
  readonly currentBeat: number;
  setBpm: (bpm: number) => void;
  setLoopEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentBeat: (beat: number) => void;
  setStatus: (status: TransportStatus) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
};

const DEFAULT_BPM = 96;

export const useTransportStore = create<TransportStore>((set) => ({
  bpm: DEFAULT_BPM,
  status: 'stopped',
  loopEnabled: false,
  volume: 0.7,
  currentBeat: 0,
  setBpm: (bpm) => {
    if (!Number.isFinite(bpm) || bpm <= 0) throw new Error('BPM must be a positive number.');
    set({ bpm });
  },
  setLoopEnabled: (loopEnabled) => set({ loopEnabled }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setCurrentBeat: (currentBeat) => set({ currentBeat: Math.max(0, currentBeat) }),
  setStatus: (status) => set({ status }),
  play: () => set({ status: 'playing' }),
  pause: () => set((state) => ({ status: state.status === 'playing' ? 'paused' : state.status })),
  stop: () => set({ status: 'stopped', currentBeat: 0 }),
}));
