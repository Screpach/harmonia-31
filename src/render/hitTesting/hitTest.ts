import type { Rect } from '../layout/LayoutTypes';
export type HitTestTarget<TId extends string = string> = { readonly id: TId; readonly bounds: Rect };
export type Point2D = { readonly x: number; readonly y: number };
function contains(bounds: Rect, point: Point2D): boolean {
  return point.x >= bounds.x && point.x <= bounds.x + bounds.width && point.y >= bounds.y && point.y <= bounds.y + bounds.height;
}
export function hitTest<TId extends string>(targets: readonly HitTestTarget<TId>[], point: Point2D): HitTestTarget<TId> | null {
  let best: HitTestTarget<TId> | null = null;
  for (const target of targets) {
    if (!contains(target.bounds, point)) continue;
    if (!best) { best = target; continue; }
    const bestArea = best.bounds.width * best.bounds.height;
    const candidateArea = target.bounds.width * target.bounds.height;
    if (candidateArea <= bestArea) best = target;
  }
  return best;
}
