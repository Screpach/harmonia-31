import { useRef } from 'react';
import { createPlaybackController } from '../../audio/playbackController';
import { TonePlaybackAdapter } from '../../audio/tone/TonePlaybackAdapter';
import { useProjectStore } from '../../state/projectStore';
import { useTransportStore } from '../../state/transport/transportStore';

function TransportControls() {
  const bpm = useTransportStore((state) => state.bpm);
  const status = useTransportStore((state) => state.status);
  const loopEnabled = useTransportStore((state) => state.loopEnabled);
  const volume = useTransportStore((state) => state.volume);
  const setBpm = useTransportStore((state) => state.setBpm);
  const setLoopEnabled = useTransportStore((state) => state.setLoopEnabled);
  const setVolume = useTransportStore((state) => state.setVolume);
  const setCurrentBeat = useTransportStore((state) => state.setCurrentBeat);
  const setStatus = useTransportStore((state) => state.setStatus);
  const stopState = useTransportStore((state) => state.stop);
  const project = useProjectStore((state) => state.history.present);
  const controllerRef = useRef<ReturnType<typeof createPlaybackController> | null>(null);

  const getController = () => {
    if (!controllerRef.current) {
      controllerRef.current = createPlaybackController({
        adapter: new TonePlaybackAdapter(),
        onBeat: (beat) => setCurrentBeat(beat),
        onStop: () => stopState(),
      });
    }
    return controllerRef.current;
  };

  return (
    <form aria-label="Transport controls" onSubmit={(event) => event.preventDefault()}>
      <p>Transport status: {status}</p>
      <div>
        <button type="button" aria-label="Play" onClick={async () => { setStatus('playing'); await getController().play(project, { bpm }); }}>Play</button>
        <button type="button" aria-label="Pause" onClick={() => setStatus('paused')}>Pause</button>
        <button type="button" aria-label="Stop" onClick={async () => { if (controllerRef.current) await controllerRef.current.stop(); stopState(); }}>Stop</button>
      </div>
      <label>
        BPM
        <input aria-label="BPM" type="number" min={1} step={1} value={bpm} onChange={(event) => { const next = Number(event.target.value); if (!Number.isFinite(next) || next <= 0) return; setBpm(next); }} />
      </label>
      <label>
        Loop enabled
        <input aria-label="Loop enabled" type="checkbox" checked={loopEnabled} onChange={(event) => setLoopEnabled(event.target.checked)} />
      </label>
      <label>
        Volume
        <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
      </label>
    </form>
  );
}

export default TransportControls;
