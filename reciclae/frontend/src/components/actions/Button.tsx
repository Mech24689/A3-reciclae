import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }

export default function Button({ variant = 'primary', ...rest }: Props) {
  return <button className={`btn ${variant}`} {...rest} />
}
