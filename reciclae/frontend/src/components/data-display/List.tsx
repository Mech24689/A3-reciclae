import React from 'react'

export function List({children}: Readonly<{children: React.ReactNode}>) {
  return <ul className="list">{children}</ul>
}

export function ListItem({children}: Readonly<{children: React.ReactNode}>) {
  return <li className="list-item">{children}</li>
}
