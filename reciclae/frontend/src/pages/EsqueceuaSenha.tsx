// IMPORTANTE: Precisamos do 'useState' do React para guardar o e-mail
import React, { useState } from 'react';

// IMPORT DO CSS (Isso você já tinha certo)
import '../styles/esqueceuasenha.css';

export default function EsqueceuaSenha() {

    // 1. Criamos um "estado" para guardar o e-mail
    const [email, setEmail] = useState('');

    // -----------------------------------------------------------------
    // 2. A FUNÇÃO 'handleSubmit'
    // Ela precisa existir para o 'onSubmit' do formulário funcionar.
    // -----------------------------------------------------------------
    //const handleSubmit = (event) => {
        // Impede o formulário de recarregar a página
      //  event.preventDefault();

        // A LÓGICA DE ENVIO VAI AQUI DENTRO:
        // (Isso só roda QUANDO o botão é clicado)
        //alert(`Link de recuperação enviado para: ${email} (Isso é um teste)`);

        // Limpa o campo de e-mail
        //setEmail('');
    //}; // <-- A função handleSubmit termina aqui.


    // 3. O 'return' (JSX) vem DEPOIS da definição da lógica.
    return (
        //  👇 AQUI ESTÁ O NOVO WRAPPER ADICIONADO 👇
        <div className="forgot-password-wrapper">

            <div className="forgot-password-container">

                {/* Agora o 'onSubmit' chama a função que acabamos de definir */}
                
                    <h2>Esqueceu a senha</h2>

                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        required

                        // Agora 'email' e 'setEmail' também existem
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" className='btn'>Solicitar senha</button>
                
            </div>

            {/* 👇 FECHANDO O NOVO WRAPPER 👇 */}
        </div>
    )
} // <-- A função 'EsqueceuaSenha' (o componente) termina aqui.
// (Note que o '</div>' que estava sobrando aqui foi removido)