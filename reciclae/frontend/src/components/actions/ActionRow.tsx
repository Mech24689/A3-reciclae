import React from 'react';

type Props = Readonly<{
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 0 | 1 | 2 | 3 | 4;
  wrap?: boolean;
  className?: string;
}>;

export default function ActionRow({
  children,
  align = 'end',
  gap = 2,
  wrap = true,
  className,
}: Props) {
  const justifyClass =
    {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    }[align];

  const cls = [
    'flex-row',                 
    `gap-${gap}`,               
    justifyClass,               
    wrap ? undefined : 'flex-nowrap',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={cls}>{children}</div>;
}
