type PlaybackCursorProps = {
  currentBeat: number;
};

function PlaybackCursor({ currentBeat }: PlaybackCursorProps) {
  const leftPercent = ((currentBeat % 4) / 4) * 100;
  return (
    <div aria-label="Playback cursor" style={{ position: 'relative', height: 8 }}>
      <div style={{ position: 'absolute', left: `${leftPercent}%`, top: 0 }}>│</div>
    </div>
  );
}

export default PlaybackCursor;
