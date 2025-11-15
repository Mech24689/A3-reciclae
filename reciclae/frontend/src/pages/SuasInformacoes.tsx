import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/layout/PageTitle';
import { getPessoaProfile, updatePessoaProfile, type PessoaProfile } from '../services/pessoaService';
import { useAuthStore } from '../store/authStore'; // Para obter o ID do usuário logado

import '../styles/cadastrouser.css';
//import '../styles/SuasInformacoes.css';

export type Sexo = 'MASCULINO' | 'FEMININO' | 'OUTRO' | '';

const OPCOES_SEXO: { value: Sexo; label: string }[] = [
    { value: '', label: '(Selecione)' },
    { value: 'MASCULINO', label: 'Masculino' },
    { value: 'FEMININO', label: 'Feminino' },
    { value: 'OUTRO', label: 'Outro' },
];

// -------------------------------------------------------------------------
// FUNÇÕES DE FORMATAÇÃO (MÁSCARAS) - Copiadas do CadastroUser.tsx para uso local
// -------------------------------------------------------------------------
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

const formatTelefone = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
        return cleaned
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        return cleaned
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(\d{4})(\d)/, '$1-$2'); 
    }
};

// -------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -------------------------------------------------------------------------

export default function SuasInformacoes() {
    
    const pessoaId = useAuthStore((state) => state.user?.pessoa_id);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // ESTADOS
    const [profile, setProfile] = useState<PessoaProfile | null>(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState(''); 
    const [telefone, setTelefone] = useState(''); 
    const [endereco, setEndereco] = useState('');
    const [sexo, setsexo] = useState('');
    // Data de nascimento não está no formulário original, mas é importante para um perfil
    const [dataNascimento, setDataNascimento] = useState(''); 

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate(); 
  

    // HANDLERS de Formatação (Mantidos)
    const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpfCnpj(formatCpfCnpj(e.target.value));
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone(formatTelefone(e.target.value));
    };

    // -------------------------------------------------------------------------
    // LÓGICA DE CARREGAMENTO DE DADOS (useEffect)
    // -------------------------------------------------------------------------
    useEffect(() => {

        const fetchProfile = async () => {
            if (!pessoaId) {
                setError('Usuário não autenticado.');
                setIsFetching(false);
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            try {
                const data = await getPessoaProfile(pessoaId);
                
                setProfile(data);
                // Popula os campos do formulário
                setNome(data.nome || '');
                setEmail(data.email || '');
                // Formata CPF/CNPJ e Telefone para exibição
                setCpfCnpj(formatCpfCnpj(data.cpf_cnpj || ''));
                setTelefone(formatTelefone(data.telefone || ''));
                setsexo(data.sexo as sexo || '');
                
                if (data.data_nasc) {
                    // "1973-04-19T03:00:00.000Z" => "1973-04-19"
                    const formattedDate = data.data_nasc.substring(0, 10); 
                    setDataNascimento(formattedDate);
                } else {
                    setDataNascimento('');
                }
                setEndereco(data.enderecos || ''); 
                
            } catch (err) {
                setError('Erro ao carregar seu perfil. Verifique sua conexão.');
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfile();
    }, [pessoaId]);

    // -------------------------------------------------------------------------
    // FUNÇÃO DE SUBMISSÃO (UPDATE)
    // -------------------------------------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!pessoaId) {
            setError('Sessão expirada. Faça login novamente.');
            return;
        }

        setIsLoading(true);
        
        // Remove a formatação antes de enviar ao backend
        const cpfCnpjLimpo = cpfCnpj.replace(/\D/g, ''); 
        const telefoneLimpo = telefone.replace(/\D/g, ''); 

        const payload: Partial<PessoaProfile> = {
            nome,
            email,
            cpf_cnpj: cpfCnpjLimpo,
            telefone: telefoneLimpo,
            enderecos: endereco,
            sexo: sexo,
            data_nasc: dataNascimento || null,
        };

        try {
            const updatedData = await updatePessoaProfile(pessoaId, payload);
            setProfile(updatedData); // Atualiza o estado principal
            setSuccess('Informações atualizadas com sucesso!');
        } catch (err: any) {
            console.error("Erro ao atualizar:", err);
            setError(err.message || 'Erro ao tentar atualizar informações.');
        } finally {
            setIsLoading(false);
        }
    };

    // Renderização condicional
    if (isFetching) {
        return <PageTitle>Carregando suas informações...</PageTitle>;
    }

    if (error && !profile) {
         return <PageTitle subtitle="Erro ao carregar dados.">{error}</PageTitle>;
    }
    
    return (
        <>
            <h1 className="titulo">Suas informações</h1>
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
                            <label >CPF:</label>
                            <input type="text" id="cpfCnpj" name="cpfCnpj" value={cpfCnpj} onChange={handleCpfCnpjChange} maxLength={11} required
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

                        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                        {/* Botões */}
                        <div className="form-buttons">
                            <button type="submit" className="btn" disabled={isLoading}>
                                {isLoading ? 'Cadastrando...' : 'Atualizar Informações'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            
        </>
    );
}