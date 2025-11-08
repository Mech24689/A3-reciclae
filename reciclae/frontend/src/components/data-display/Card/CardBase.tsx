// CardBase.tsx
import type { HTMLAttributes } from 'react';

type DivProps = Readonly<HTMLAttributes<HTMLDivElement>>;

export function CardBase({ children, className, ...props }: DivProps) {
    return <div className={`card ${className ?? ''}`} {...props}>{children}</div>;
}
