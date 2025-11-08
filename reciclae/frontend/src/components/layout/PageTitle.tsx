// src/components/typography/PageTitle.tsx
import React from 'react';

export default function PageTitle({
  children,
  subtitle,
  level = 1,
}: Readonly<{
  children: React.ReactNode;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}>) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <header className="page-title">
      <Tag>{children}</Tag>
      {subtitle && <p className="muted">{subtitle}</p>}
    </header>
  );
}
