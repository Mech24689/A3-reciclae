import '../../styles/header.css';
import { useNavigate } from 'react-router-dom' 

export default function NavBarLogado() {
  const navigate = useNavigate(); 

  // Função para navegar para a rota de Cadastro
  const handleAboutClick = () => {
    navigate('/sobre-nos'); // Rota de destino para Cadastro
  }

  const handleDiasColetaClick = () => {
    navigate('/DiasDeColeta'); // Rota de destino para Cadastro
  }

  const handlePontosColetaClick = () => {
    navigate('/pontos-coleta'); // Rota de destino para Cadastro
  }

  const handleCadastroVeiculoClick = () => {
    navigate('/cadastro-veiculo'); // Rota de destino para Cadastro
  }

  const handleContatoClick = () => {
    navigate('/cadastro'); // Rota de destino para Cadastro
  }

  return (
    <nav className='btn-header'>
      <ul>
        <li className='btn-header-link' onClick={handleAboutClick}>Sobre nós</li>
        <li className='btn-header-link' onClick={handleDiasColetaClick}>Dias de coleta</li>
        <li className='btn-header-link' onClick={handlePontosColetaClick}>Pontos de coleta</li>
        <li className='btn-header-link' onClick={handleCadastroVeiculoClick}>Cadastrar Veículo</li>
        <li className='btn-header-link' onClick={handleContatoClick}>Contato</li>
      </ul>
    </nav>
  )
}
