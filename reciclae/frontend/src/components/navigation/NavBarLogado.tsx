import '../../styles/header.css';
import { useNavigate } from 'react-router-dom' 

export default function NavBarLogado() {
  const navigate = useNavigate(); 

  // Função para navegar para a rota de Cadastro
  const handleAboutClick = () => {
    navigate('/sobre-nos'); // Rota de destino para Cadastro
  }

  const handlePontoColetaClick = () => {
    navigate('/pontos-coleta'); // Rota de destino para Cadastro
  }

  return (
    <nav className='btn-header'>
      <ul>
        <li className='btn-header-link' onClick={handleAboutClick}>Sobre nós</li>
        <li className='btn-header-link'>Dias de coleta</li>
        <li className='btn-header-link' onClick={handlePontoColetaClick}>Pontos de coleta</li>
        <li className='btn-header-link'>Cadastrar Veículo</li>
        <li className='btn-header-link'>Contato</li>
      </ul>
    </nav>
  )
}
