import React from 'react'
import Button from '../actions/Button';

export default function SearchBar({ onSearch }: Readonly<{ onSearch: (term: string) => void }>) {
  const [q, setQ] = React.useState('')
  return (
    <form className="searchbar" onSubmit={(e) => { e.preventDefault(); onSearch(q) }}>
      <input type="search" placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)} />
      <Button type="submit" variant="ghost" >Buscar</Button>
    </form>
  )
}
