// CardAnchor.tsx
import type { AnchorHTMLAttributes } from 'react';

type AnchorProps = Readonly<AnchorHTMLAttributes<HTMLAnchorElement>>;

export function CardAnchor({ href, target, rel, children }: AnchorProps) {
    const safeRel = target === '_blank' ? rel ?? 'noopener noreferrer' : rel;
    return <a href={href} target={target} rel={safeRel} className="card">{children}</a>;
}
