import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login
import { login } from '../services/authService'; // A função que chama sua API
import '../styles/login.css';

// Importe o SEU ARQUIVO CSS
import '../styles/Login.css'; 

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // 1. Chamada à API
            const authData = await login({ username, senha });
            
            // 2. Gerenciamento do Estado (Validação)
            // Salvar o Token no Storage para uso futuro
            localStorage.setItem('authToken', authData.token);
            

            //useAuthStore.getState().login(authData); // <--- Armazena no estado global!

            // Você pode querer salvar os dados do usuário em um gerenciador de estado global (Zustand/Redux)
            // Exemplo (A ser implementado): useAuthStore.setState({ user: authData.user, isAuthenticated: true });
            console.log("Token recebido:", authData);
            //console.log("Login validado com sucesso! Usuário:", authData.user.login);
            
            // 3. Redirecionamento
            // Redireciona para a tela inicial ou dashboard do usuário
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