import { NavLink } from 'react-router-dom'
import ThemeToggle from '../theme/ThemeToggle'

export default function NavBar() {
  return (
    <nav className="top-nav" aria-label="principal">
      <ul className="nav-list">
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>Sobre nós</NavLink></li>
        <li><NavLink to="/DiasDeColeta" className={({ isActive }) => isActive ? 'active' : ''}>Dias de coleta</NavLink></li>
        <li><NavLink to="/PontosDeColeta" className={({ isActive }) => isActive ? 'active' : ''}>Pontos de coleta</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Cadastrar Veículo</NavLink></li>
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  )
}
