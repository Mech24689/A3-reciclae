import SkipToContentLink from "../a11y/SkipToContentLink";
import { useLocation } from 'react-router-dom'
import Header from "./Header";
import Home from "../../pages/Home"; 
import About from "../../pages/About";
import PontosDeColeta from "../../pages/PontosDeColeta"; 
import CadastroVeiculo from "../../pages/CadastroVeiculo";
import CadastroUser from "../../pages/CadastroUser";
import Login from "../../pages/Login";
import EsqueceuaSenha from "../../pages/EsqueceuaSenha";
import TermosUso from "../../pages/Termos";
import Contato from "../../pages/Contato";
import { FaWhatsapp } from 'react-icons/fa'
import QuadroColetas from "../data-display/QuadroColetas";
import '../../styles/Login.css'; 
// 1. Definição das Propriedades (Props)
interface AppLayoutProps {
  children: React.ReactNode;
  bodyClassName?: string;
  mainClassName?: string;
  skipTargetId?: string;
}

// 2. Usando as Props para renderizar o conteúdo
export default function AppLayout({
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
    } else if (currentPath === '/pontos-coleta') {
      NavbarComponent = <PontosDeColeta/>;
    } else if (currentPath === '/cadastro-veiculo') {
      NavbarComponent = <CadastroVeiculo/>;
       } else if (currentPath === '/termosuso') {
      NavbarComponent = <TermosUso/>;
    }
    else if (currentPath === '/cadastro-user') {
      NavbarComponent = <CadastroUser/>;
       }
    else if (currentPath === '/login') {
      NavbarComponent = <Login/>;

     } else if (currentPath === '/esqueceu-a-senha') {
      NavbarComponent = <EsqueceuaSenha/>;
    } else if (currentPath === '/contato') {
      NavbarComponent = <Contato/>;
    }
    else if (currentPath === '/DiasDeColeta') {
      NavbarComponent = <QuadroColetas/>;
    }else if (currentPath === '/esqueceu-a-senha') {
      NavbarComponent = <EsqueceuaSenha/>;
    }
    else {
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
          <a
                  href="https://wa.me/5511954949932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-float"
                >
                  <FaWhatsapp size={32} />
                </a>
          {NavbarComponent} {/* Aqui entra o conteúdo da página (Home, About, etc.) */}
        </main>
        
      </div>
    </div>
  );
}