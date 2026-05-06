export type DiagnosticLocation = {
  readonly measureId: string;
  readonly voiceId?: 'soprano' | 'alto' | 'tenor' | 'bass';
  readonly eventId?: string;
  readonly noteLabel?: string;
};

export function atMeasure(measureId: string): DiagnosticLocation {
  return { measureId };
}

export function atEvent(measureId: string, eventId: string, voiceId?: DiagnosticLocation['voiceId']): DiagnosticLocation {
  return { measureId, eventId, voiceId };
}
