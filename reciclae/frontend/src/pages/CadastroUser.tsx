// //import React from 'react'
// import PageTitle from '../components/layout/PageTitle'
// import Section from '../components/layout/Section'
// import DetailView from '../components/data-display/DetailView'
// import Skeleton from '../components/loading/Skeleton'
// import EmptyState from '../components/empty/EmptyState'

// export default function CadastroUser() {
//   return (
//     <>
//       <div>teste</div>
//     </>
//   )
// }

// //import React from 'react'
// import PageTitle from '../components/layout/PageTitle'
// import Section from '../components/layout/Section'
// import DetailView from '../components/data-display/DetailView'
// import Skeleton from '../components/loading/Skeleton'
// import EmptyState from '../components/empty/EmptyState'

// export default function CadastroUser() {
//   return (
//     <>
//       <div>teste123
      
//       </div>
//     </>
//   )
// }
import React, { useState } from 'react'
import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'

// Importe o arquivo CSS que criaremos abaixo
// import './CadastroUser.css'
import '../styles/teste.css';

// Seus outros imports (DetailView, Skeleton, etc.) 
// não são necessários para este formulário específico.

export default function CadastroUser() {
  // State para guardar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    endereco: '',
    telefone: '',
    sexo: '',
    dataNascimento: '2025-08-17', // Valor da imagem
    termos: true, // Marcado como na imagem
  })

  // Função para atualizar o state quando o usuário digita
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    // Aqui você adicionaria a lógica para enviar os dados para seu backend/API
    alert('Usuário cadastrado! (Verifique o console)')
  }

  return (
    <>
      {/* Usando seu componente PageTitle para o título */}
      <PageTitle title="Cadastrar Usuário" />

      {/* Usando seu componente Section para agrupar o conteúdo */}
      <Section>
        {/* O 'user-form-container' é onde o CSS vai aplicar o estilo do container verde */}
        <div className="user-form-container">
          <form onSubmit={handleSubmit}>
            
            {/* Nome */}
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>

            {/* E-mail */}
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* CPF */}
            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>

            {/* Endereço */}
            <div className="form-group">
              <label htmlFor="endereco">Endereço:</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>

            {/* Telefone */}
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>

            {/* Sexo */}
            <div className="form-group">
              <label htmlFor="sexo">Sexo:</label>
              <input
                type="text"
                id="sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
              />
            </div>

            {/* Data de Nascimento */}
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento:</label>
              <input
                type="date" // O tipo "date" cria o seletor de data
                id="dataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
              />
            </div>

            {/* Termos e Condições */}
            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="termos"
                name="termos"
                checked={formData.termos}
                onChange={handleChange}
              />
              <label htmlFor="termos">
                Declaro que li e aceito os termos de uso
                <a href="/termos" className="termos-link">TERMOS E CONDIÇÕES DE USO</a>
              </label>
            </div>

            {/* Botões */}
            <div className="form-buttons">
              <button type="submit" className="btn-submit">CADASTRAR</button>
              <button type="button" className="btn-secondary">CADASTRAR VEICULO</button>
            </div>

          </form>
        </div>
      </Section>
    </>
  )
}