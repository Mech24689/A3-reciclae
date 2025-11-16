import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { type RegistrationData, type UserRole } from '../types/estrutura';

import '../styles/cadastrouser.css';
// Importe seu CSS para modal aqui (ex: import '../styles/modal.css')

// -------------------------------------------------------------------------
// FUNÇÕES DE FORMATAÇÃO (MÁSCARAS) - Mantidas
// -------------------------------------------------------------------------

/** Remove caracteres não-numéricos e aplica a máscara de CPF (11 dígitos) ou CNPJ (14 dígitos). */
const formatCpfCnpj = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
        return cleaned
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
        return cleaned
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }
};

/** Remove caracteres não-numéricos e aplica a máscara de Telefone/Celular. */
const formatTelefone = (value: string): string => {
    // 1. Limpa o valor, deixando apenas dígitos
    const cleaned = value.replace(/\D/g, '');
    
    // 2. Lógica para 10 dígitos (Fixo / Celular antigo)
    if (cleaned.length <= 10) {
        // Formato: (99) 9999-9999
        return cleaned
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    } 
    
    else {
        // Formato: (99) 99999-9999
        // Captura 2 dígitos (DDD), 5 dígitos e 4 dígitos
        return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
};

// -------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -------------------------------------------------------------------------

export type Sexo = 'MASCULINO' | 'FEMININO' | 'OUTRO' | '';

const OPCOES_SEXO: { value: Sexo; label: string }[] = [
    { value: '', label: '(Selecione)' },
    { value: 'MASCULINO', label: 'Masculino' },
    { value: 'FEMININO', label: 'Feminino' },
    { value: 'OUTRO', label: 'Outro' },
];

const CadastroUser: React.FC = () => {
    const navigate = useNavigate();

    // ESTADOS
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState<Sexo>('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [termosAceitos, setTermosAceitos] = useState(false); // Aceitação final
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado do pop-up

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // HANDLERS DE FORMATAÇÃO - Mantidos
    const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatCpfCnpj(rawValue);
        setCpfCnpj(formattedValue);
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatTelefone(rawValue);
        setTelefone(formattedValue);
    };

    // -------------------------------------------------------------------------
    // HANDLERS DO POP-UP
    // -------------------------------------------------------------------------

    const handleOpenModal = (e: React.MouseEvent) => {
        e.preventDefault(); // Impede que o link de termos tente navegar
        setIsModalOpen(true);
    };

    const handleAcceptTerms = () => {
        setTermosAceitos(true); // Marca como aceito
        setIsModalOpen(false);  // Fecha o pop-up
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Se o usuário fechar sem aceitar, o checkbox permanece como estava
    };


    // FUNÇÃO DE SUBMISSÃO
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }
        if (!termosAceitos) {
            setError('Você deve aceitar os termos de uso para continuar.');
            return;
        }
        if (sexo === '') {
            setError('Selecione o campo Sexo.');
            return;
        }

        setIsLoading(true);

        const cpfCnpjLimpo = cpfCnpj.replace(/\D/g, '');
        const telefoneLimpo = telefone.replace(/\D/g, '');
        
        const dataNascimentoObjeto = dataNascimento 
            ? new Date(dataNascimento) 
            : null;

        const data: RegistrationData = {
            pessoa: {
                prefeitura_id: 1,
                nome: nome,
                cpf_cnpj: cpfCnpjLimpo,
                tipo_pessoa: 'CIDADAO',
                email: email,
                telefone: telefoneLimpo,
                sexo: sexo,
                data_nasc: dataNascimentoObjeto,
                enderecos: endereco,
                termos: termosAceitos ? 'ACEITO' : 'NAO_ACEITO',
            },
            usuario: {
                username: email,
                senha_texto_puro: senha,
                role: 'CIDADAO',
                prefeitura_id: 1,
            },
        };

        try {
            await register(data);

            setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
            setTimeout(() => navigate('/login'), 2000);

        } catch (err: any) {
            console.error("Erro no cadastro:", err);
            setError(err.message || 'Erro ao tentar registrar. Verifique os dados.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="titulo">Cadastro de usuário</h1>
            <div>
                <div className="user-form-container">
                    <form onSubmit={handleSubmit} className='form-user'>


                        <div className="campoUsr">
                            <label >Nome:</label>
                            <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>


                        <div className="campoUsr">
                            <label >E-mail:</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>


                        <div className="campoUsr">
                            <label >Senha:</label>
                            <input type="password" id="senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </div>


                        <div className="campoUsr">
                            <label >Confirmar senha:</label>
                            <input type="password" id="confirmarSenha" name="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                        </div>


                        <div className="campoUsr">
                            <label >CPF:</label>
                            <input type="text" id="cpfCnpj" name="cpfCnpj" value={cpfCnpj} onChange={handleCpfCnpjChange} maxLength={14} required
                            />
                        </div>

                        
                        <div className="campoUsr">
                            <label >Telefone:</label>
                            <input type="tel" id="telefone" name="telefone" value={telefone} onChange={handleTelefoneChange} maxLength={15} />
                        </div>

                        
                        <div className="campoUsr">
                            <label >Sexo:</label>
                            <select className="select" id="sexo" name="sexo" value={sexo} onChange={(e) => setSexo(e.target.value as Sexo)} required                            >
                                {OPCOES_SEXO.map(opcao => (
                                    <option key={opcao.value} value={opcao.value} disabled={opcao.value === ''}>
                                        {opcao.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        
                        <div className="campoUsr">
                            <label >Data de nascimento:</label>
                            <input type="date" id="dataNascimento" name="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                        </div>

                        
                        <div className="campoUsr">
                            <label >Endereço:</label>
                            <input type="text" id="endereco" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                        </div>


                        {/* TERMOS E CONDIÇÕES: Checkbox com Pop-up */}
                        <div className="form-group-checkbox">
                            <input
                                type="checkbox"
                                id="termos"
                                name="termos"
                                checked={termosAceitos}
                                onChange={(e) => setTermosAceitos(e.target.checked)}
                            // REMOVIDO o required no input, a validação será feita no handleSubmit
                            />
                            <label htmlFor="termos">Declaro que li e aceito os termos de uso
                                {/* 🚨 CHAMA O POP-UP AO CLICAR NO LINK */}
                                <a href="#" onClick={handleOpenModal} className="termos-link">TERMOS E CONDIÇÕES DE USO</a>
                            </label>
                        </div>

                        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                        {/* Botões */}
                        <div className="form-buttons">
                            <button type="submit" className="btn" disabled={isLoading}>
                                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* ------------------------------------------------------------------------- */}
            {/* JSX DO POP-UP (MODAL) */}
            {/* ------------------------------------------------------------------------- */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Termos e Condições de Uso do ReciclaÊ</h3>
                        <p>
                            <br />
                            Os presentes Termos e Condições de Uso ("Termos") regulamentam o acesso e a utilização do sistema Reciclaê, abrangendo todo o seu conteúdo, funcionalidades e serviços disponibilizados pela Reciclaê, seja na condição de visitante ou usuário registrado.
                            <br /><br />
                            Ao acessar ou utilizar o sistema, você manifesta sua aceitação e concordância em estar vinculado a estes Termos. Caso não concorde com qualquer disposição aqui contida, recomendamos que se abstenha de acessar ou utilizar o sistema.

                        </p>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={handleCloseModal}>
                                Cancelar
                            </button>
                            <button className="btn-submit" onClick={handleAcceptTerms}>
                                Aceitar e Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default CadastroUser;