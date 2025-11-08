import React from 'react'

export default function Tag({ children }: Readonly<{ children: React.ReactNode }>) {
  return <span className="tag-badge">{children}</span>
}
