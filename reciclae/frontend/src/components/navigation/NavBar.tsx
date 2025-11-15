import '../../styles/header.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; 

export default function NavBar() {
  const navigate = useNavigate();

  // 🚨 Pega o estado de autenticação e a função de logout
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // ... (Funções handle...Click permanecem as mesmas) ...
  const handleLoginClick = () => { navigate('/login'); }
  const handleCadastroClick = () => { navigate('/cadastro-user'); }
  const handleAboutClick = () => { navigate('/sobre-nos'); }
  const handleDiasColetaClick = () => { navigate('/DiasDeColeta'); }
  const handlePontosColetaClick = () => { navigate('/pontos-coleta'); }
  const handleCadastroVeiculoClick = () => { navigate('/cadastro-veiculo'); }
  const handleContatoClick = () => { navigate('/contato'); }


  return (
    <nav className='btn-header'>
      <ul>

        <li className='btn-header-link' onClick={handleAboutClick}>Sobre nós</li>
        <li className='btn-header-link' onClick={handleDiasColetaClick}>Dias de coleta</li>
        <li className='btn-header-link' onClick={handlePontosColetaClick}>Pontos de coleta</li>
        {isAuthenticated ? (
          <li className='btn-header-link' onClick={handleCadastroVeiculoClick}>Cadastrar Veículo</li>
        ): null}
        
        <li className='btn-header-link' onClick={handleContatoClick}>Contato</li>

        
        {isAuthenticated ? (
        
          <li className='btn-login-cadastro btn-logout' onClick={logout}>Sair</li>
        ) : (

          <>
            <li className='btn-login-cadastro btn-login' onClick={handleLoginClick}>Login</li>
            <li className='btn-login-cadastro btn-cadastro' onClick={handleCadastroClick}>Cadastrar</li>
          </>
        )}
      </ul>
    </nav>
  );
}