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
 <header className="mb-6">
      <Tag className="text-3xl font-bold text-gray-800 mb-2">{children}</Tag>
      {subtitle && <p className="text-gray-600 text-lg text left">{subtitle}</p>}
    </header>
  );
}