import React from 'react'

type propsSection = {
  readonly title?: string;
  readonly children: React.ReactNode;
}

export default function Section(
  { title, children }: propsSection
) {
  return (
    <section className="section">
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  )
}
