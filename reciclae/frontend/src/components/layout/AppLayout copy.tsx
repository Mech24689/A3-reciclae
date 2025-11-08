// import SkipToContentLink from "../a11y/SkipToContentLink";
// import Header from "./Header";
// import Home from "../../pages/Home";
// import About from "../../pages/About";
// import { Link, useLocation } from 'react-router-dom'

// // export default function AppLayout({
// //   children,
// //   bodyClassName,
// //   mainClassName,
// //   skipTargetId = "main-content",
// // }: Readonly<{
// //   children: React.ReactNode;
// //   bodyClassName?: string;
// //   mainClassName?: string;
// //   skipTargetId?: string;
// // }>) {
// //   return (
// //     <div className="app-shell">
// //       <SkipToContentLink targetId={skipTargetId} />
// //       <Header />
// //       <div className={["app-body grid grid-cols-12", bodyClassName].filter(Boolean).join(" ")}>
// //         <main id={skipTargetId} className={["col-span-12 p-3", mainClassName].filter(Boolean).join(" ")}>          
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// export default function AppLayout() {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   let NavbarComponent;

//   if (currentPath === '/') {
//       NavbarComponent = <Home />;
//     } else if (currentPath === '/sobre-nos') {
//       NavbarComponent = <About />;
//     } else {
//       NavbarComponent = <Home />; 
//     }
//   return (
//     <div className="appLayout">
//     <Link to={currentPath} className="brand">
//       <Header />
//       {NavbarComponent}
//     </Link>
//     </div>
//   );
// }





import SkipToContentLink from "../a11y/SkipToContentLink";
import Header from "./Header";
// Não precisamos mais de Home, About e useLocation/Link aqui, pois o Layout
// deve renderizar o CHILDREN, e não decidir qual página mostrar.
import Home from "../../pages/Home"; 
import About from "../../pages/About";
import { useLocation } from 'react-router-dom'

// 1. Definição das Propriedades (Props)
interface AppLayoutProps {
  children: React.ReactNode;
  bodyClassName?: string;
  mainClassName?: string;
  skipTargetId?: string;
}

// 2. Usando as Props para renderizar o conteúdo
export default function AppLayout({
  children,
  bodyClassName,
  mainClassName,
  skipTargetId = "main-content",
}: AppLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  let NavbarComponent;

  if (currentPath === '/') {
      NavbarComponent = <Home />;
    } else if (currentPath === '/sobre-nos') {
      NavbarComponent = <About />;
    } else {
      NavbarComponent = <Home />; 
    }
  
  // 3. Estrutura de Flexbox em Coluna:
  return (
    // A div 'app-shell' deve receber as propriedades de flexbox.
    // Você definirá as classes 'app-shell' no seu arquivo CSS.
    <div className="app-shell"> 
      <SkipToContentLink targetId={skipTargetId} />
      
      {/* O Header fica no topo */}
      <Header />
      
      {/* O corpo/conteúdo fica logo abaixo */}
      <div 
        className={
          ["app-body grid grid-cols-12", bodyClassName]
          .filter(Boolean)
          .join(" ")
        }
      >
        <main 
          id={skipTargetId} 
          className={
            ["col-span-12 p-3", mainClassName]
            .filter(Boolean)
            .join(" ")
          }
        >
          {NavbarComponent} {/* Aqui entra o conteúdo da página (Home, About, etc.) */}
        </main>
      </div>
    </div>
  );
}