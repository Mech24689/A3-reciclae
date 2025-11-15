// IMPORTANTE: Precisamos do 'useState' do React para guardar o e-mail
import React, { useState } from 'react';

// IMPORT DO CSS (Isso você já tinha certo)
import '../styles/esqueceuasenha.css';

export default function EsqueceuaSenha() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');

    // -----------------------------------------------------------------
    // 2. A FUNÇÃO 'handleSubmit'
    // Ela precisa existir para o 'onSubmit' do formulário funcionar.
    // -----------------------------------------------------------------
     const handleSubmit = async (e: React.FormEvent) => {
        // Impede o formulário de recarregar a página
        e.preventDefault();

        // A LÓGICA DE ENVIO VAI AQUI DENTRO:
        // (Isso só roda QUANDO o botão é clicado)
        //alert(`Link de recuperação enviado para: ${email} (Isso é um teste)`);

        // Limpa o campo de e-mail
        //setEmail('');
    }; // <-- A função handleSubmit termina aqui.


    // 3. O 'return' (JSX) vem DEPOIS da definição da lógica.
    return (
        

        <div className='content-EsqueceuSenha-1'>

            <h1 className="titulo">Esqueceu a senha</h1>
            <div className='content-EsqueceuSenha'>
                <form onSubmit={handleSubmit} className='form-EsqueceuSenha'>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="campoUsr">
                        <label>Login:</label>
                         <input type="text" placeholder="informe seu login" value={email} onChange={(e) => setEmail(e.target.value)}  />
                    </div>
                   
                    <div className='areabutton'>
                        <button type="submit" disabled={isLoading} className='btn'>
                            {isLoading ? 'Validando...' : 'Solicitar nova senha'}
                        </button>
                       
                    </div>
                </form>
            </div>
        </div>

        
    )
} // <-- A função 'EsqueceuaSenha' (o componente) termina aqui.
// (Note que o '</div>' que estava sobrando aqui foi removido)