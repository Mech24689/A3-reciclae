// src/store/authStore.ts

import { create } from 'zustand';
import { type AuthResponse } from '../types/estrutura'; // O tipo de resposta da sua API

interface AuthState {
    isAuthenticated: boolean;
    user: AuthResponse['user'] | null;
    token: string | null;
    
    // Ações (Funções para modificar o estado)
    login: (authData: AuthResponse) => void;
    logout: () => void;
    initialize: () => void; // Para carregar o estado ao iniciar o app
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,

    // Função que armazena os dados do login
    login: (authData) => {
        // Armazena no localStorage (persistência)
        localStorage.setItem('authToken', authData.token);
        
        // Atualiza o estado global
        set({
            isAuthenticated: true,
            user: authData.user,
            token: authData.token,
        });
    },

    // Função para logout
    logout: () => {
        localStorage.removeItem('authToken');
        set({ isAuthenticated: false, user: null, token: null });
    },
    
    // Função para carregar o token ao carregar o aplicativo
    initialize: () => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            // Em uma aplicação real, aqui você faria uma chamada para /me 
            // ou decodificaria o token para verificar se ele é válido e não expirou.
            
            // Por enquanto, apenas o token
            set({ isAuthenticated: true, token });
        }
    }
}));