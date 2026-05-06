export type ChordInversionDefinition = {
  readonly inversion: 'root' | 'first' | 'second' | 'third';
  readonly bassToneIndex: number;
};

export type ChordKindProvenance = {
  readonly source: 'synthetic-development-only' | 'awaiting-private-rule-pack' | 'external';
  readonly datasetId?: string;
};

export type ChordKind = {
  readonly id: string;
  readonly name: string;
  readonly intervalSteps31: readonly number[];
  readonly inversions: readonly ChordInversionDefinition[];
  readonly aliases: readonly string[];
  readonly provenance: ChordKindProvenance;
};
