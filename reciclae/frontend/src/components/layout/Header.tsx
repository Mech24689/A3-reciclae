import NavBar from '../navigation/NavBar'
import { Link } from 'react-router-dom'
import '../../styles/header.css';

export default function Header() {
  return (
    <header className="header">
        <Link to="/" className="brand">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="" aria-hidden="true" />
          <span>ReciclaÊ</span>
        </div>
        </Link>
        <NavBar />
    </header>
  )
}
