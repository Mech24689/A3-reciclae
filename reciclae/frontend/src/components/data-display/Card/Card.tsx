import { type To } from 'react-router-dom';
import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import { CardLink } from './CardLink';
import { CardAnchor } from './CardAnchor';
import { CardBase } from './CardBase';

type BaseCard = Readonly<{
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}>;

type CardProps =
  | (BaseCard & {
    to: To;
    href?: never;
    target?: never;
    rel?: never
  })
  | (BaseCard & {
    href: string;
    to?: never;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    rel?: string; 
  }
  )
  | (BaseCard &
    Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
      to?: never;
      href?: never;
      target?: never;
      rel?: never;
    }
  );

export default function Card(props: CardProps) {
  const { size, className } = props as BaseCard;
  const composed = ['card', className, size ? `card-${size}` : '']
    .filter(Boolean)
    .join(' ');

  const nextProps = { ...(props as any), className: composed };
  if (props.to) return <CardLink {...nextProps} />;
  if (props.href) return <CardAnchor {...nextProps} />;
  return <CardBase {...nextProps} />;
}
