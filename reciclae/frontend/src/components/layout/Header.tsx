import NavBar from '../navigation/NavBar'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/header.css';
import logoTipo from '../../assets/logo.png'

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  let NavbarComponent;

  // Lógica para definir qual NavBar carregar (esta parte está OK)
  NavbarComponent = <NavBar />;
  
  return (
    <header className="header">
      {/* Link para a logo (OK) */}
      <Link to="/" className="brand">
        <div className="logo">
          <img src={logoTipo} alt="" aria-hidden="true" />
          <span>ReciclaÊ</span>
        </div>
      </Link>
      {NavbarComponent}
    
    </header>
  )
}