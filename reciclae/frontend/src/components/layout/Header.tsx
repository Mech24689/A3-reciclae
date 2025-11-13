// import NavBar from '../navigation/NavBar'
// import NavBarLogado from '../navigation/NavBarLogado';
// import { Link, useLocation } from 'react-router-dom'
// import '../../styles/header.css';

// export default function Header() {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   let NavbarComponent;

//   if (currentPath === '/') {
//     NavbarComponent = <NavBar />;
//   } else if (currentPath === '/sobre-nos') {
//     NavbarComponent = <NavBarLogado />;
//   } else {
//     NavbarComponent = <NavBar />; 
//   }

//   return (
//     <header className="header">
//         <Link to="/" className="brand">
//         <div className="logo">
//           <img src="/src/assets/logo.png" alt="" aria-hidden="true" />
//           <span>ReciclaÊ</span>
//         </div>
//         </Link>
//         <Link to={currentPath} className="brand">
//         {NavbarComponent}
//       </Link>
//     </header>
//   )
// }

import NavBar from '../navigation/NavBar'
import NavBarLogado from '../navigation/NavBarLogado';
import { Link, useLocation } from 'react-router-dom'
import '../../styles/header.css';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  let NavbarComponent;

  // Lógica para definir qual NavBar carregar (esta parte está OK)
  if (currentPath === '/') {
    NavbarComponent = <NavBar />;
  } else if (currentPath === '/sobre-nos') {
    NavbarComponent = <NavBarLogado />;
  } else {
    NavbarComponent = <NavBar />; 
  }

  return (
    <header className="header">
      {/* Link para a logo (OK) */}
      <Link to="/" className="brand">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="" aria-hidden="true" />
          <span>ReciclaÊ</span>
        </div>
      </Link>
      {NavbarComponent}
    
    </header>
  )
}