import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNav() {
  return (
    <nav className="side-nav" aria-label="secundária">
      <p className="side-title">Seções</p>
      <ul className="side-list">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>Componentes</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Formulários</NavLink></li>
      </ul>
    </nav>
  )
}
