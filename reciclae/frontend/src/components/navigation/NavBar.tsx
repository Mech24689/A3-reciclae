// import '../../styles/header.css';
// import { useNavigate } from 'react-router-dom'

// export default function NavBar() {
//   return (
//     <nav className='btn-header'>
//       <ul>
//         <li className='btn-header-link'>Sobre nós</li>
//         <li className='btn-header-link'>Dias de coleta</li>
//         <li className='btn-header-link'>Pontos de coleta</li>
//         <li className='btn-header-link'>Cadastrar Veículo</li>
//         <li className='btn-header-link'>Contato</li>
//         <li className='btn-login-cadastro btn-login'>Login</li>
//         <li className='btn-login-cadastro btn-cadastro'>Cadastrar</li>
//       </ul>
//     </nav>
//   )
// }

import React from 'react'; // Boa prática importar React, mesmo que não seja estritamente necessário em todas as versões.
import '../../styles/header.css';
import { useNavigate } from 'react-router-dom' // 👈 Importação necessária

export default function NavBar() {
  const navigate = useNavigate(); // 👈 Inicializa o hook de navegação

  // Função para navegar para a rota de Login
  const handleLoginClick = () => {
    navigate('/login'); // Rota de destino para Login
  }

  // Função para navegar para a rota de Cadastro
  const handleCadastroClick = () => {
    navigate('/cadastro-user'); // Rota de destino para Cadastro
  }

  const handleAboutClick = () => {
    navigate('/sobre-nos'); // Rota de destino para Cadastro
  }

  const handleDiasColetaClick = () => {
    navigate('/dias-coleta'); // Rota de destino para Cadastro
  }

  const handlePontosColetaClick = () => {
    navigate('/pontos-coleta'); // Rota de destino para Cadastro
  }

  const handleCadastroVeiculoClick = () => {
    navigate('/cadastro-veiculo'); // Rota de destino para Cadastro
  }

  const handleContatoClick = () => {
    navigate('/contato'); // Rota de destino para Cadastro
  }

  return (
    <nav className='btn-header'>
      <ul>
        {/* Você pode substituir <li> por <Link> se forem links simples */}
        <li className='btn-header-link' onClick={handleAboutClick}>Sobre nós</li>
        <li className='btn-header-link' onClick={handleDiasColetaClick}>Dias de coleta</li>
        <li className='btn-header-link' onClick={handlePontosColetaClick}>Pontos de coleta</li>
        <li className='btn-header-link' onClick={handleCadastroVeiculoClick}>Cadastrar Veículo</li>
        <li className='btn-header-link' onClick={handleContatoClick}>Contato</li>
        
        {/* Botão de Login com navegação */}
        <li 
          className='btn-login-cadastro btn-login' 
          onClick={handleLoginClick} // 👈 Aplica o evento de clique
        >
          Login
        </li>
        
        {/* Botão de Cadastro com navegação */}
        <li 
          className='btn-login-cadastro btn-cadastro'
          onClick={handleCadastroClick} // 👈 Aplica o evento de clique
        >
          Cadastrar
        </li>
      </ul>
    </nav>
  )
}