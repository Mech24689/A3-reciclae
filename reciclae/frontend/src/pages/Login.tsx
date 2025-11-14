import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login
import { login } from '../services/authService'; // A função que chama sua API
import { useAuthStore } from '../store/authStore';
import '../styles/login.css';

// Importe o SEU ARQUIVO CSS
import '../styles/Login.css'; 

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const authLogin = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // 1. Chamada à API
            const authData = await login({ username, senha });
            
            authLogin(authData.token, authData.user);

            console.log("Token recebido:", authData);
            
            navigate('/About'); 

        } catch (err: any) {
            // Captura erros de rede ou a exceção lançada pelo authService (ex: Credenciais Inválidas)
            console.error("Erro no login:", err);
            setError(err.message || 'Falha ao conectar. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div>
            <p>Login</p>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                disabled={isLoading}
            />
            </div>
            <div>
                <p>Senha</p>
            <input 
                type="password" 
                placeholder="Senha" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                disabled={isLoading}
            />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Validando...' : 'Entrar'}
            </button>
            <p>Esqueceu a senha?</p>
        </form>
    );
};
export default LoginScreen;