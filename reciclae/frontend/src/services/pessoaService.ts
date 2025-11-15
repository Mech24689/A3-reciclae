import api from '../api/httpClient'; 
import { type RegistrationData } from '../types/estrutura'; 

// Defina a interface para o perfil da pessoa que o backend retorna (baseado no que você cadastra)
export interface PessoaProfile {
    id: number;
    nome: string;
    cpf_cnpj: string;
    email: string; // O e-mail da pessoa
    telefone: string;
    enderecos: string; // Endereço
    sexo: 'MASCULINO' | 'FEMININO' | 'OUTRO' | string;
    data_nasc: Date | null; // Formato YYYY-MM-DD
    prefeitura_id: number;
    
}

// Rota de acesso ao perfil da Pessoa
const PESSOA_URLS = {
    // Rota para buscar ou atualizar dados de uma Pessoa específica
    PROFILE: (pessoaId: number) => `/pessoas/${pessoaId}`, 
};

/**
 * Busca o perfil completo da Pessoa usando seu ID.
 */
export async function getPessoaProfile(pessoaId: number): Promise<PessoaProfile> {
    try {
        const response = await api.get<PessoaProfile>(PESSOA_URLS.PROFILE(pessoaId));
        console.log("Dados da pessoa recebidos:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar perfil da pessoa:", error);
        throw new Error('Falha ao carregar suas informações pessoais.');
    }
}

/**
 * Atualiza o perfil da Pessoa usando seu ID.
 */
export async function updatePessoaProfile(pessoaId: number, data: Partial<PessoaProfile>): Promise<PessoaProfile> {
    try {
        // Envia apenas os dados modificados (PATCH ou PUT, dependendo do seu backend)
        const response = await api.put<PessoaProfile>(PESSOA_URLS.PROFILE(pessoaId), data); 
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar perfil da pessoa:", error);
        throw new Error('Falha ao alterar suas informações. Verifique os dados.');
    }
}