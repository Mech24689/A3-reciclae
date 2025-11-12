import React, { useState } from 'react'
import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'

// Importe o SEU ARQUIVO CSS
// import '../styles/Login.css'; 

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Tentativa de Login:', { login, senha })
    alert('Verificando credenciais... (olhe o console!)')
  }

  return (
    <Section>
      <div className="login-page-wrapper">
        <div className="login-form-box">
          <form onSubmit={handleSubmit}>
            <label htmlFor="login">Login</label>
            <input
              type="text"
              id="login"
              placeholder="Digite seu login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit" className="btn-entrar">
              Entrar
            </button>

            <a href="#" className="forgot-password">
              Esqueceu a senha?
            </a>
          </form>
        </div>
      </div>
    </Section>
  )
}