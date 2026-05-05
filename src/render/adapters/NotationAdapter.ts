import type { Project } from '../../domain/score/Project';
import type { Rect } from '../layout/LayoutTypes';

export type GridCellView = {
  readonly voiceId: Project['score']['voices'][number];
  readonly measureId: string;
  readonly text: string;
  readonly eventIds: readonly string[];
  readonly bounds: Rect;
};

export type NotationGridView = {
  readonly title: string;
  readonly measureHeaders: readonly { readonly id: string; readonly label: string }[];
  readonly rows: readonly {
    readonly voiceId: Project['score']['voices'][number];
    readonly cells: readonly GridCellView[];
  }[];
};

export type NotationAdapterRenderResult = {
  readonly kind: 'satb-grid';
  readonly grid: NotationGridView;
  readonly decisionTag: 'awaiting-private-rule-pack';
};

export interface NotationAdapter {
  render(project: Project): NotationAdapterRenderResult;
}
