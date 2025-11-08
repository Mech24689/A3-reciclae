import React from 'react'

export default function VisuallyHidden({children}: Readonly<{children: React.ReactNode}>) {
  return <span className="vh">{children}</span>
}
