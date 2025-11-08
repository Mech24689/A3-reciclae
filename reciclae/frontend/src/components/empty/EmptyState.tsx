import React from 'react'

export default function EmptyState({ title = 'Nada por aqui', children }: Readonly<{ title?: string, children?: React.ReactNode }>) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {children && <p className="muted">{children}</p>}
    </div>
  )
}
