import React, { useState, useEffect } from 'react';
import PageTitle from '../components/layout/PageTitle';
import { useNavigate } from 'react-router-dom';
import { registerVeiculo, getVeiculosByPessoa, updateVeiculo } from '../services/veiculoService';
import { type VeiculoData, type VeiculoResponse } from '../types/estrutura';
import { useAuthStore } from '../store/authStore';
import "../styles/CadastroVeiculo.css"

const OPCOES_TIPO = [
  { value: '', label: '(Selecione)' },
  { value: 'CARRO', label: 'Carro' },
  { value: 'MOTO', label: 'Moto' },
  { value: 'CAMINHAO', label: 'Caminhão' },
];


const CadastroVeiculo: React.FC = () => {
  const navigate = useNavigate();

  const pessoaId = useAuthStore((state) => state.user?.pessoa_id);
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
  useEffect(() => {
    const fetchVeiculo = async () => {

      if (!isAuthenticated) {
        setError('Usuário não autenticado.');
        setIsFetching(false);

        setTimeout(() => navigate('/login'), 2000);

        return;
      }

      try {
        // Assume que queremos editar o PRIMEIRO veículo cadastrado, se houver
        const veiculos = await getVeiculosByPessoa(pessoaId);

        console.log("Pessoa ID no CadastroVeiculo:", pessoaId, " veiculos=", veiculos);
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
  }, [pessoaId]);

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

    console.log("Pessoa ID no CadastroVeiculo:", pessoaId, " veiculoPayload=", veiculoPayload);

    try {
      if (veiculoAtual && veiculoAtual.id) {
        console.log("Executando updateVeiculo ...");
        await updateVeiculo(veiculoAtual.id, veiculoPayload);
        setSuccess('Veículo atualizado com sucesso!');
      } else {
        // 🚨 CENÁRIO 2: CADASTRAR NOVO (POST)
        console.log("Executando registerVeiculo ...");
        await registerVeiculo(veiculoPayload);
        setSuccess('Veículo cadastrado com sucesso!');
      }
      setTimeout(() => navigate('/'), 1500);

    } catch (err: any) {
      console.error("Erro na operação de veículo:", err);
      setError(err.message || 'Erro ao tentar salvar veículo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <PageTitle>Carregando dados do veículo...</PageTitle>;
  }

  const title = veiculoAtual ? 'Editar Cadastro do Veículo' : 'Cadastrar Novo Veículo';
  const buttonText = veiculoAtual ? 'Atualizar Cadastro' : 'Confirmar Cadastro';

  return (
    <div>
      <h1 className="titulo">Cadastrar veículo</h1>

      <div>
        <form className="formulario" onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <div className="campoVcl">
            <label>Tipo de veículo:</label>
            <select className="select" id="tipoVeiculo" name="tipoVeiculo" value={tipoVeiculo} onChange={(e) => setTipoVeiculo(e.target.value as VeiculoData['tipo_veiculo'] | '')} required            >
              {OPCOES_TIPO.map(opcao => (
                <option key={opcao.value} value={opcao.value} disabled={opcao.value === ''}>
                  {opcao.label}
                </option>
              ))}
            </select>
          </div>


          <div className="campoVcl">
            <label>Placa:</label>
            <input type="text" id="placa" placeholder="informe a placa" name="placa" value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase())} required />
          </div>
          <div className="campoVcl">
            <label>Marca:</label>
            <input type="text" id="marca" placeholder="informe a marca" name="marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
          </div>

          <div className="campoVcl">
            <label>Modelo do veículo:</label>
            <input type="text" id="modelo" placeholder="informe o veículo" name="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
          </div>


          <div className="campoVcl">
            <label>Ano de fabricação:</label>
            <input type="number" id="ano" placeholder="informe o ano fab." name="ano" value={ano} onChange={(e) => setAno(Number(e.target.value))} min={1900} max={new Date().getFullYear() + 1} required
            />
          </div>

          <div className="campoVcl">
            <label>Cor:</label>
            <input type="text" id="cor" placeholder="informe a cor do veículo" name="cor" value={cor} onChange={(e) => setCor(e.target.value)} required />
          </div>

          {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

          <div className="form-buttons">
            <button type="submit" className="btn-cadastrar" disabled={isLoading}>
              {isLoading ? 'SALVANDO...' : buttonText}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
export default CadastroVeiculo;