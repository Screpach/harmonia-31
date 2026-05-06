import type { GenerationCandidate } from './GenerationCandidate';

export type GenerationRejectionReason = {
  readonly code:
    | 'cancelled'
    | 'timeout'
    | 'search-space-exhausted'
    | 'no-valid-candidates'
    | 'awaiting-private-rule-pack';
  readonly detail: string;
};

export type GenerationRunStatus = 'ok' | 'partial' | 'rejected' | 'cancelled';

export type GenerationResult = {
  readonly requestId: string;
  readonly status: GenerationRunStatus;
  readonly candidates: readonly GenerationCandidate[];
  readonly rejectionReasons: readonly GenerationRejectionReason[];
  readonly explanation: string;
  readonly telemetry: {
    readonly elapsedMs: number;
    readonly nodesVisited: number;
    readonly workerReady: boolean;
    readonly cancellationSupported: boolean;
  };
};
