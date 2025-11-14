// src/services/veiculoService.ts

import api from '../api/httpClient'; // Assumindo que você tem um axios instance configurado
import { type VeiculoData, type VeiculoResponse } from '../types/estrutura';

const VEICULO_URLS = {
    // Rota que pode buscar todos os veículos de uma pessoa
    GET_BY_PESSOA: (pessoaId: number) => `/api/pessoas/${pessoaId}/veiculos`, 
    REGISTER: '/api/veiculos',
    // Rota para atualizar (PUT/PATCH) um veículo específico
    UPDATE: (veiculoId: number) => `/api/veiculos/${veiculoId}`, 
};

// 1. Função para buscar o(s) veículo(s) da pessoa
export async function getVeiculosByPessoa(pessoaId: number): Promise<VeiculoResponse[]> {
    try {
        const response = await api.get<VeiculoResponse[]>(VEICULO_URLS.GET_BY_PESSOA(pessoaId));
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
        const response = await api.put<VeiculoResponse>(VEICULO_URLS.UPDATE(veiculoId), data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar veículo:", error);
        throw new Error('Falha ao atualizar veículo.');
    }
}

export async function registerVeiculo(data: VeiculoData): Promise<VeiculoResponse> {
    try {
        // Envia o objeto VeiculoData para o backend
        const response = await api.post<VeiculoResponse>(VEICULO_URLS.REGISTER, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar veículo:", error);
        // Trate o erro para lançar uma mensagem amigável no frontend
        throw new Error('Falha ao cadastrar veículo. Verifique a placa e os dados.');
    }
}