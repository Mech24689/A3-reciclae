import React from 'react'

export default function SkipToContentLink({ targetId }: Readonly<{ targetId: string }>) {
  return <a className="skip-to-content" href={`#${targetId}`}>Pular para o conteúdo</a>
}
