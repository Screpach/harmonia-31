import type { ReactNode } from 'react';

type SelectionOverlayProps = {
  selected: boolean;
  children: ReactNode;
};

function SelectionOverlay({ selected, children }: SelectionOverlayProps) {
  return (
    <span data-selected={selected ? 'true' : 'false'} className={selected ? 'satb-grid__selection satb-grid__selection--active' : 'satb-grid__selection'}>
      {children}
    </span>
  );
}

export default SelectionOverlay;
