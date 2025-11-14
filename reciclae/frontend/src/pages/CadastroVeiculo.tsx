// src/pages/CadastroVeiculo.tsx

import React, { useState, useEffect } from 'react';
import PageTitle from '../components/layout/PageTitle';
import Section from '../components/layout/Section';
import { useNavigate } from 'react-router-dom';
import { type registerVeiculo, type getVeiculosByPessoa, type updateVeiculo } from '../services/veiculoService'; 
import { type VeiculoData, type VeiculoResponse } from '../types/estrutura'; // Adicione VeiculoResponse na sua tipagem
import { useAuthStore } from '../store/authStore'; 


// Opções para o Combobox de Tipo de Veículo
const OPCOES_TIPO = [
    { value: '', label: 'Selecione o Tipo' },
    { value: 'CARRO', label: 'Carro' },
    { value: 'MOTO', label: 'Moto' },
    { value: 'CAMINHAO', label: 'Caminhão' },
];

const CadastroVeiculo: React.FC = () => {
    const navigate = useNavigate();
    
    // Pega o ID da pessoa logada do Store
    const pessoaId = useAuthStore((state) => state.user?.id);

    // ESTADOS DO VEÍCULO
    const [veiculoAtual, setVeiculoAtual] = useState<VeiculoResponse | null>(null); // Armazena o veículo existente
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState<number | ''>(''); 
    const [cor, setCor] = useState('');
    const [tipoVeiculo, setTipoVeiculo] = useState<'CARRO' | 'MOTO' | 'CAMINHAO' | ''>('');

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true); // Novo estado para o carregamento inicial
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // --------------------------------------------------------------------
    // LÓGICA DE CARREGAMENTO (FETCH)
    // --------------------------------------------------------------------
    useEffect(() => {
        const fetchVeiculo = async () => {
            if (!pessoaId) {
                setError('Usuário não autenticado.');
                setIsFetching(false);

                //setTimeout(() => navigate('/login'), 2000);
                
                return;
            }

            try {
                // Assume que queremos editar o PRIMEIRO veículo cadastrado, se houver
                const veiculos = await getVeiculosByPessoa(pessoaId);
                
                if (veiculos.length > 0) {
                    const veiculo = veiculos[0];
                    setVeiculoAtual(veiculo); // Salva o objeto completo
                    
                    // Popula os campos do formulário para edição
                    setMarca(veiculo.marca);
                    setModelo(veiculo.modelo);
                    setPlaca(veiculo.placa);
                    setAno(veiculo.ano);
                    setCor(veiculo.cor);
                    setTipoVeiculo(veiculo.tipo_veiculo);
                }
            } catch (err) {
                setError('Erro ao carregar dados do veículo.');
            } finally {
                setIsFetching(false);
            }
        };

        fetchVeiculo();
    }, [pessoaId]); // Roda apenas quando o ID da pessoa estiver disponível

    // --------------------------------------------------------------------
    // FUNÇÃO DE SUBMISSÃO (CREATE ou UPDATE)
    // --------------------------------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!pessoaId) {
            setError('Usuário não autenticado. Faça login novamente.');
            return;
        }
        if (tipoVeiculo === '') {
             setError('Selecione o Tipo de Veículo.');
            return;
        }
        if (!ano || ano.toString().length !== 4) {
             setError('O Ano deve ser um valor válido de 4 dígitos.');
            return;
        }

        setIsLoading(true);

        // Objeto de dados (com campos limpos)
        const veiculoPayload: VeiculoData = {
            // Se o ID da pessoa não for necessário no payload de UPDATE, remova-o
            pessoa_id: pessoaId, 
            marca: marca,
            modelo: modelo,
            placa: placa.toUpperCase().replace(/[^A-Z0-9]/g, ''), 
            ano: Number(ano),
            cor: cor,
            tipo_veiculo: tipoVeiculo as 'CARRO' | 'MOTO' | 'CAMINHAO',
        } as VeiculoData; // Casting forçar a tipagem do payload

        try {
            if (veiculoAtual && veiculoAtual.id) {
                // 🚨 CENÁRIO 1: ATUALIZAR (PUT/PATCH)
                await updateVeiculo(veiculoAtual.id, veiculoPayload);
                setSuccess('Veículo atualizado com sucesso!');
            } else {
                // 🚨 CENÁRIO 2: CADASTRAR NOVO (POST)
                await registerVeiculo(veiculoPayload);
                setSuccess('Veículo cadastrado com sucesso!');
            }
            
            setTimeout(() => navigate('/dashboard'), 1500); 

        } catch (err: any) {
            console.error("Erro na operação de veículo:", err);
            setError(err.message || 'Erro ao tentar salvar veículo.');
        } finally {
            setIsLoading(false);
        }
    };

    // --------------------------------------------------------------------
    // RENDERIZAÇÃO
    // --------------------------------------------------------------------

    if (isFetching) {
        return <PageTitle>Carregando dados do veículo...</PageTitle>;
    }

    const title = veiculoAtual ? 'Editar Cadastro do Veículo' : 'Cadastrar Novo Veículo';
    const buttonText = veiculoAtual ? 'ATUALIZAR' : 'CONFIRMAR CADASTRO';

    return (
        <>
            <PageTitle>{title}</PageTitle>
            <Section>
                <div className="user-form-container">
                    <form onSubmit={handleSubmit}>
                        
                        {/* Tipo de Veículo (Combobox) */}
                        <div className="form-group">
                            <label htmlFor="tipoVeiculo">Tipo de Veículo:</label>
                            <select 
                                id="tipoVeiculo" 
                                name="tipoVeiculo" 
                                value={tipoVeiculo} 
                                onChange={(e) => setTipoVeiculo(e.target.value as VeiculoData['tipo_veiculo'] | '')} 
                                required
                            >
                                {OPCOES_TIPO.map(opcao => (
                                    <option key={opcao.value} value={opcao.value} disabled={opcao.value === ''}>
                                        {opcao.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Marca */}
                        <div className="form-group">
                            <label htmlFor="marca">Marca:</label>
                            <input type="text" id="marca" name="marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                        </div>

                        {/* Modelo */}
                        <div className="form-group">
                            <label htmlFor="modelo">Modelo:</label>
                            <input type="text" id="modelo" name="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                        </div>

                        {/* Placa */}
                        <div className="form-group">
                            <label htmlFor="placa">Placa:</label>
                            <input 
                                type="text" 
                                id="placa" 
                                name="placa" 
                                value={placa} 
                                onChange={(e) => setPlaca(e.target.value.toUpperCase())} 
                                required 
                            />
                        </div>
                        
                        {/* Ano */}
                        <div className="form-group">
                            <label htmlFor="ano">Ano:</label>
                            <input 
                                type="number" 
                                id="ano" 
                                name="ano" 
                                value={ano} 
                                onChange={(e) => setAno(Number(e.target.value))} 
                                min={1900}
                                max={new Date().getFullYear() + 1}
                                required 
                            />
                        </div>
                        
                        {/* Cor */}
                        <div className="form-group">
                            <label htmlFor="cor">Cor:</label>
                            <input type="text" id="cor" name="cor" value={cor} onChange={(e) => setCor(e.target.value)} required />
                        </div>

                        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                        <div className="form-buttons">
                            <button type="submit" className="btn-submit" disabled={isLoading}>
                                {isLoading ? 'SALVANDO...' : buttonText}
                            </button>
                            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>VOLTAR</button>
                        </div>

                    </form>
                </div>
            </Section>
        </>
    );
};

export default CadastroVeiculo;