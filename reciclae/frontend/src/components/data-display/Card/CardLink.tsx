// CardLink.tsx
import { Link as RRLink, type To } from 'react-router-dom';
import type { ReactNode } from 'react';

export function CardLink({ to, children, ...props }: Readonly<{ to: To; children: ReactNode }>) {
    return <RRLink to={to} className="card" {...props}>{children}</RRLink>;
}
