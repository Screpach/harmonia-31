import type { ReactNode } from 'react';

type LayoutRegionProps = {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

function LayoutRegion({ title, description, children, className }: LayoutRegionProps) {
  return (
    <section className={className} aria-label={title}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}

export default LayoutRegion;
