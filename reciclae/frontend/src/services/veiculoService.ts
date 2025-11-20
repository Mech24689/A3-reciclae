// src/services/veiculoService.ts

import authVeiculo from '../api/httpVeiculo'; 
import { type VeiculoData, type VeiculoResponse } from '../types/estrutura';

const VEICULO_URLS = {
    // Rota que pode buscar todos os veículos de uma pessoa
    GET_BY_PESSOA: (pessoaId: number) => `/pessoas/${pessoaId}/veiculos`, 
    REGISTER: '/veiculos',
    // Rota para atualizar (PUT/PATCH) um veículo específico
    UPDATE: (veiculoId: number) => `/veiculos/${veiculoId}`, 
};

// 1. Função para buscar o(s) veículo(s) da pessoa
export async function getVeiculosByPessoa(pessoaId: number | undefined): Promise<VeiculoResponse[]> {
    
    // 💡 CORREÇÃO AQUI: Verifica se o ID é undefined antes de prosseguir
    if (pessoaId === undefined) {
        console.error("Pessoa ID é undefined. Não é possível buscar veículos.");
        return []; // Retorna um array vazio imediatamente
    }

    try {
        // A chamada é segura, pois TypeScript sabe que 'pessoaId' é um 'number' neste ponto.
        const response = await authVeiculo.get<VeiculoResponse[]>(VEICULO_URLS.GET_BY_PESSOA(pessoaId));
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar veículos:", error);
        return []; // Retorna array vazio se não houver ou der erro
    }
}

// 2. Função para atualizar um veículo existente
export async function updateVeiculo(veiculoId: number, data: Partial<VeiculoData>): Promise<VeiculoResponse> {
    try {
        // Usa PUT para atualização (ou PATCH, dependendo do backend)
        const response = await authVeiculo.put<VeiculoResponse>(VEICULO_URLS.UPDATE(veiculoId), data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar veículo:", error);
        throw new Error('Falha ao atualizar veículo.');
    }
}

export async function registerVeiculo(data: VeiculoData): Promise<VeiculoResponse> {
    try {
        // Envia o objeto VeiculoData para o backend
        console.log("Registrando veículo com dados:", data);
        
        const response = await authVeiculo.post<VeiculoResponse>(VEICULO_URLS.REGISTER, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar veículo:", error);
        // Trate o erro para lançar uma mensagem amigável no frontend
        throw new Error('Falha ao cadastrar veículo. Verifique a placa e os dados.');
    }
}