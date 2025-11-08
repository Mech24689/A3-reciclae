import React from 'react';


type ParagraphProps = Readonly<{
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'small' | 'lead';
  spacing?: string;
  className?: string;
}>;

export default function Paragraph({
  children,
  variant = 'default',
  spacing,
  className,
}: ParagraphProps) {
  const classes = [
    'paragraph',
    spacing, 
    variant === 'muted' && 'muted',
    variant === 'small' && 'text-sm',
    variant === 'lead' && 'text-lead',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <p className={classes}>{children}</p>;
}
