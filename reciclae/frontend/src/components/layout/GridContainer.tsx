import React from 'react';

type Props = Readonly<{
  /** número máximo de colunas no desktop */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  flexRow?: boolean; 
  className?: string;
  children: React.ReactNode;
}>;

export default function GridContainer({ cols = 3, flexRow = false, className, children }: Props) {
  const safe = Math.max(1, Math.min(cols, 12));          // evita valores inválidos
  const mdCols = Math.min(2, safe);                      // no md: até 2 colunas
  const classes = [
    'grid',
    'grid-cols-1',                                       // mobile: 1
    `md:grid-cols-${mdCols}`,                            // md: 2 (ou 1 se cols=1)
    `lg:grid-cols-${safe}`,                              // lg: = cols
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}
