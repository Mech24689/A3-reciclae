import React, { useState } from 'react'
import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { type RegistrationData, type UserRole } from '../types/estrutura';

import '../styles/cadastrouser.css';

import type EsqueceuaSenha from './EsqueceuaSenha';

const CadastroUser: React.FC = () => {
  // State para guardar os dados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [termos, setTermos] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  // Função para atualizar o state quando o usuário digita
  /*const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }*/

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const navigate = useNavigate(); // Você precisa chamar o Hook para definir 'navigate'
    // Aqui você adicionaria a lógica para enviar os dados para seu backend/API
    setError(null);
    setSuccess(null);

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    const data: RegistrationData = {
      pessoa: {
        prefeitura_id: 1,
        nome: nome,
        cpf_cnpj: cpfCnpj,
        tipo_pessoa: 'CIDADAO',
        email: email,
        telefone: telefone,
        sexo: sexo,
        data_nasc: dataNascimento ? new Date(dataNascimento) : null,
        enderecos: endereco,
        termos: termos,

      },
      usuario: {
        username: username,
        senha_texto_puro: senha, // A API espera 'senha_texto_puro'
        role: 'CIDADAO',         // Definido como default
      },
    };
    try {
      // Chamada ao serviço de registro
      console.log("Dados para registro:", data);
      await register(data);

      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      
      setTimeout(() => navigate('/login'), 2000);

    } catch (err: any) {
      // Captura erros da API (ex: CPF já cadastrado)
      console.error("Erro no cadastro:", err);
      setError(err.message || 'Erro ao tentar registrar. Verifique os dados.');
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>

      {/* Usando seu componente PageTitle para o título */}
      <PageTitle>Cadastro de Usuário</PageTitle>


      {/* Usando seu componente Section para agrupar o conteúdo */}
      <Section>
        {/* O 'user-form-container' é onde o CSS vai aplicar o estilo do container verde */}
        <div className="user-form-container">
          <form onSubmit={handleSubmit}>

            {/* Nome */}
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            {/* E-mail */}
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {/* SENHA */}
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input type="text" id="senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>

            {/* CONFIRME SUA SENHA */}
            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha:</label>
              <input type="text" id="confirmarSenha" name="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
            </div>

            {/* CPF */}
            <div className="form-group">
              <label htmlFor="cpfCnpj">CPF:</label>
              <input type="text" id="cpfCnpj" name="cpfCnpj" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
            </div>

            {/* Endereço */}
            <div className="form-group">
              <label htmlFor="endereco">Endereço:</label>
              <input type="text" id="endereco" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            </div>

            {/* Telefone */}
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input type="text" id="telefone" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>

            {/* Sexo */}
            <div className="form-group">
              <label htmlFor="sexo">Sexo:</label>
              <input type="text" id="sexo" name="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} />
            </div>

            {/* Data de Nascimento */}
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento:</label>
              <input type="date" id="dataNascimento" name="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
            </div>

            {/* Termos e Condições */}
            <div className="form-group-checkbox">
              <input type="text" id="termos" name="termos" value={termos} onChange={(e) => setTermos(e.target.value)} required />
              <label htmlFor="termos">Declaro que li e aceito os termos de uso<a href="/termosuso" className="termos-link">TERMOS E CONDIÇÕES DE USO</a>
              </label>
            </div>

            {/* Botões */}
            <div className="form-buttons">
              <button type="submit" className="btn-submit" disabled={isLoading}>
                  {isLoading ? 'Cadastrando...' : 'CADASTRAR'}
              </button>
              <button type="button" className="btn-secondary">CADASTRAR VEICULO</button>
            </div>

          </form>

        </div>
      </Section>
    </>
  )
};
export default CadastroUser;