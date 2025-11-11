//import React, { useState } from 'react';
import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'

// --- CSS Básico (em formato de objeto JavaScript) ---
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: '2rem',
    backgroundColor: '#E6FADE', // O fundo verde-claro do seu rascunho
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff', // Fundo branco
    borderRadius: '16px', // Borda arredondada
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
  },
  fieldGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontSize: '1rem',
  },
  // Estilo específico para o <select> parecer com o <input>
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontSize: '1rem',
    backgroundColor: '#fff',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.2s',
  },
  message: {
    textAlign: 'center',
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  errorMessage: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
    border: '1px solid #F5C6CB',
  },
  successMessage: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
    border: '1px solid #C3E6CB',
  }
};

// --- Tipos (A Mágica do TSX) ---

// Tipo para os dados do formulário
type FormData = {
  name: string;
  email: string;
  cpf: string;
  endereco: string;
  telefone: string;
  sexo: string;
  dataNascimento: string;
  password: string;
  confirmPassword: string;
};

// Tipo para a mensagem de feedback
type FeedbackMessage = {
  type: 'success' | 'error';
  text: string;
};


export default function CadastroUser() {
  // 1. ESTADO: Guardar os dados de cada campo
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    cpf: '',
    endereco: '',
    telefone: '',
    sexo: '',
    dataNascimento: '',
    password: '',
    confirmPassword: '',
  });

  const [termos, setTermos] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  // Função para atualizar o estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 2. AÇÃO: O que acontece ao clicar em "Cadastrar"
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // --- Validações ---
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não conferem!' });
      setIsLoading(false);
      return;
    }
    if (!termos) {
      setMessage({ type: 'error', text: 'Você precisa aceitar os termos de uso.' });
      setIsLoading(false);
      return;
    }

    // Prepara os dados para enviar (omitindo a confirmação)
    const { confirmPassword, ...dataToSubmit } = formData;

    // 3. A MÁGICA (fetch): Chamar sua API de Back-end
    try {
      // ATENÇÃO: Verifique se o seu back-end está rodando nesta porta!
      const response = await fetch('http://localhost:3333/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result: { message?: string; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao cadastrar.');
      }

      // Sucesso!
      setMessage({ type: 'success', text: result.message || 'Cadastro realizado!' });
      // Aqui você poderia limpar o formulário ou redirecionar

    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'error', text: 'Um erro inesperado ocorreu.' });
      }
    } finally {
      setIsLoading(false);
    }
  }; // <-- AQUI TERMINA A LÓGICA (handleSubmit)

  
 
  
} // <-- AQUI TERMINA O COMPONENTE