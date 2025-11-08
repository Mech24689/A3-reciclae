import React from 'react'

export default function DetailView({ title, children }: Readonly<{ title: string, children: React.ReactNode }>) {
  return (
    <article className="detail">
      <h3>{title}</h3>
      <div className="detail-content">{children}</div>
    </article>
  )
}
