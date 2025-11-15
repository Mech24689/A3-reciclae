import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Para redirecionar após o login
import { login } from '../services/authService'; // A função que chama sua API
import { useAuthStore } from '../store/authStore';
import '../styles/login.css';

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

            const authData = await login({ username, senha });

            authLogin(authData.token, authData.user);

            console.log("Token recebido:", authData);
            console.log("Token recebido:", authData.user);

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
        <div className='content-login-1'>

            <h1 className="titulo">Bem vindo</h1>
            <div className='content-login'>
                <form onSubmit={handleSubmit} className='form-login'>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="campoUsr">
                        <label>Login:</label>
                        <input type="text" placeholder="informe seu login" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
                    </div>
                    <div className="campoUsr">
                        <label>Senha:</label>
                        <input type="password" placeholder="informe sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} disabled={isLoading} />
                    </div>

                    <div className='areabutton'>
                        <button type="submit" disabled={isLoading} className='btn'>
                            {isLoading ? 'Validando...' : 'Entrar'}
                        </button>
                        <Link to="esqueceu-a-senha" className="brand">
                            <p className='esqueceuSenha'>Esqueceu a senha?</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default LoginScreen;