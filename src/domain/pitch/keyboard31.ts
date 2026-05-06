export type Keyboard31Key = {
  readonly step: number;
  readonly spelling: string;
};

export const KEYBOARD31_ONE_OCTAVE = Object.freeze([
  { step: 0, spelling: 'C' },
  { step: 1, spelling: 'C↑' },
  { step: 2, spelling: 'C#' },
  { step: 3, spelling: 'Db' },
  { step: 4, spelling: 'D↓' },
  { step: 5, spelling: 'D' },
  { step: 6, spelling: 'D↑' },
  { step: 7, spelling: 'D#' },
  { step: 8, spelling: 'Eb' },
  { step: 9, spelling: 'E↓' },
  { step: 10, spelling: 'E' },
  { step: 11, spelling: 'E↑' },
  { step: 12, spelling: 'E#' },
  { step: 13, spelling: 'F' },
  { step: 14, spelling: 'F↑' },
  { step: 15, spelling: 'F#' },
  { step: 16, spelling: 'Gb' },
  { step: 17, spelling: 'G↓' },
  { step: 18, spelling: 'G' },
  { step: 19, spelling: 'G↑' },
  { step: 20, spelling: 'G#' },
  { step: 21, spelling: 'Ab' },
  { step: 22, spelling: 'A↓' },
  { step: 23, spelling: 'A' },
  { step: 24, spelling: 'A↑' },
  { step: 25, spelling: 'A#' },
  { step: 26, spelling: 'Bb' },
  { step: 27, spelling: 'B↓' },
  { step: 28, spelling: 'B' },
  { step: 29, spelling: 'B↑' },
  { step: 30, spelling: 'B#' },
] as const satisfies readonly Keyboard31Key[]);
