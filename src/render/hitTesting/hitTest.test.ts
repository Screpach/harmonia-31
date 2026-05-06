import { describe, expect, it } from 'vitest';
import { hitTest, type HitTestTarget } from './hitTest';

const targets: readonly HitTestTarget[] = [
  { id: 'large', bounds: { x: 0, y: 0, width: 100, height: 100 } },
  { id: 'small', bounds: { x: 20, y: 20, width: 20, height: 20 } },
  { id: 'small-later', bounds: { x: 20, y: 20, width: 20, height: 20 } },
];

describe('hitTest', () => {
  it('returns null when no target contains the point', () => {
    expect(hitTest(targets, { x: 200, y: 200 })).toBeNull();
  });

  it('chooses the smallest matching bounds', () => {
    expect(hitTest(targets, { x: 25, y: 25 })?.id).toBe('small-later');
  });

  it('is deterministic for equal-size overlaps using later target as topmost', () => {
    expect(hitTest(targets, { x: 22, y: 22 })?.id).toBe('small-later');
  });
});
