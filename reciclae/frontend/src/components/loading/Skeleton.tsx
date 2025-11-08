import React from 'react'

type skeletonProps = {
  readonly loading?: boolean,
  readonly children: React.ReactNode,
  readonly className?: string,
}

export default function Skeleton({ loading=false, children, className }: skeletonProps) {
  if (!loading) return <>{children}</>;
  return (
    <div
      className={["skeletonize", className].filter(Boolean).join(" ")}
      aria-busy="true"
      aria-live="polite"
    >
      {children}
    </div>
  );
}

