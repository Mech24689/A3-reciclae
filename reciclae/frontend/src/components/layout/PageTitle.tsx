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
  

  return (
 <header className="mb-6">
      
      {subtitle && <p className="text-gray-600 text-lg text left">{subtitle}</p>}
    </header>
  );
}