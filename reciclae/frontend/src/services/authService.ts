import api from '../api/httpPessoa'; // Cliente padrão (MS-Pessoa: 3002)
import authClient from '../api/httpUser'; // 🚨 NOVO Cliente de autenticação (MS-Usuário: 3001)


import { type AuthResponse, type LoginData, type RegistrationData } from '../types/estrutura';


const AUTH_URLS = {
  LOGIN: '/usuarios/login',
  REGISTER: '/pessoas', // A rota que registra Pessoa e Usuario
};

/**
 * Realiza a chamada de Login na API.
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await authClient.post<AuthResponse>(AUTH_URLS.LOGIN, {
      login: data.username,
      senha: data.senha,
    });

    // Armazena o token recebido no localStorage ou no state manager (ex: Zustand)
    localStorage.setItem('authToken', response.data.token);

    return response.data;
  } catch (error) {
    // Tratamento de erro (ex: 401 Credenciais Inválidas)
    throw new Error('Falha no login. Verifique suas credenciais.');
  }
}

/**
 * Realiza a chamada de Registro (Pessoa + Usuário) na API.
 */
export async function register(data: RegistrationData): Promise<void> {

  console.log("Enviando dados para registro:", data);
  console.log("AUTH_URLS.REGISTER:", AUTH_URLS.REGISTER);

  try {
    await api.post(AUTH_URLS.REGISTER, data);

  } catch (error) {
    // Tratamento de erro (ex: 409 Conflito de CPF/CNPJ)
    throw new Error('Falha no registro. CPF/Email/Username já cadastrado.');
  }
}