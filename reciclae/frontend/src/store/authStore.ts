// src/store/authStore.ts

import { create } from 'zustand';

// Defina a estrutura dos dados que você recebe do backend
interface UserProfile {
    id: number;
    username: string;
    role: string;
    prefeituraId: number;
    // Adicione outros campos importantes
}

interface AuthState {
    isAuthenticated: boolean;
    user: UserProfile | null;
    token: string | null;
    
    // Funções de manipulação de estado
    login: (token: string, user: UserProfile) => void;
    logout: () => void;
    initialize: () => void; // Para verificar o localStorage
}

export const useAuthStore = create<AuthState>((set) => ({
    // Estados Iniciais
    isAuthenticated: false,
    user: null,
    token: null,

    // Função de Login: Salva o token no localStorage e no estado
    login: (token, user) => {
        localStorage.setItem('authToken', token);
        // Você também pode salvar o usuário se ele for pequeno:
        // localStorage.setItem('user', JSON.stringify(user)); 
        set({
            isAuthenticated: true,
            user: user,
            token: token,
        });
    },

    // Função de Logout: Remove o token e reseta o estado
    logout: () => {
        localStorage.removeItem('authToken');
        // localStorage.removeItem('user'); 
        set({ isAuthenticated: false, user: null, token: null });
    },
    
    // Inicialização: Verifica o localStorage
    initialize: () => {
        const storedToken = localStorage.getItem('authToken');
        
        if (storedToken) {
            // Em um app real, você faria uma chamada para validar o token.
            // Aqui, apenas marcamos como autenticado se o token existir.
            set({ isAuthenticated: true, token: storedToken });
        }
    }
}));