// src/services/veiculo.service.ts

import knex, { Tabela } from '../knex';
import { Veiculo, VeiculoCreate, VeiculoUpdate, VeiculoComPessoa } from '../models/Veiculo';

/**
 * Funções CRUD para a tabela Veiculo, utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Criar um novo Veículo)
export async function createVeiculo(data: VeiculoCreate): Promise<Veiculo> {
  try {
    const [novoVeiculo] = await knex(Tabela.VEICULO)
      .insert(data)
      .returning('*');
      
    return novoVeiculo as Veiculo;
  } catch (err) {
    console.error('Erro ao criar veículo (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Veículos, com nome da Pessoa responsável)
export async function getAllVeiculos(): Promise<VeiculoComPessoa[]> {
  try {
    // JOIN com Pessoa para trazer o nome e documento do responsável
    const veiculos = await knex(Tabela.VEICULO)
      .join(Tabela.PESSOA, `${Tabela.VEICULO}.pessoa_id`, `${Tabela.PESSOA}.id`)
      .select([
        `${Tabela.VEICULO}.*`, // Seleciona todos os campos do Veiculo
        `${Tabela.PESSOA}.nome as pessoa_nome`, // Adiciona o nome da Pessoa
        `${Tabela.PESSOA}.cpf_cnpj as pessoa_cpf_cnpj`, // Adiciona o documento
      ])
      .orderBy(`${Tabela.VEICULO}.placa`);
      
    return veiculos as VeiculoComPessoa[];
  } catch (err) {
    console.error('Erro ao buscar veículos (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Veículo por ID, com nome da Pessoa)
export async function getVeiculoById(id: number): Promise<VeiculoComPessoa | undefined> {
  try {
    const veiculo = await knex(Tabela.VEICULO)
      .join(Tabela.PESSOA, `${Tabela.VEICULO}.pessoa_id`, `${Tabela.PESSOA}.id`)
      .select([
        `${Tabela.VEICULO}.*`,
        `${Tabela.PESSOA}.nome as pessoa_nome`,
        `${Tabela.PESSOA}.cpf_cnpj as pessoa_cpf_cnpj`,
      ])
      .where(`${Tabela.VEICULO}.id`, id)
      .first();
      
    return veiculo as VeiculoComPessoa | undefined;
  } catch (err) {
    console.error('Erro ao buscar veículo por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Veículo por ID)
export async function updateVeiculo(id: number, data: VeiculoUpdate): Promise<Veiculo | undefined> {
  try {
    const [veiculoAtualizado] = await knex(Tabela.VEICULO)
      .where('id', id)
      .update(data)
      .returning('*');

    return veiculoAtualizado as Veiculo | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar veículo ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Veículo por ID)
export async function deleteVeiculo(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.VEICULO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    // Atenção: Deletar uma Pessoa que tenha Veículos vinculados pode dar erro de Foreign Key
    // Se essa for uma tabela pai/filho, pode ser necessário deletar a pessoa primeiro, ou usar ON DELETE CASCADE no DB
    console.error(`Erro ao deletar veículo ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. READ por Pessoa (Buscar todos os veículos de uma Pessoa)
export async function getVeiculosByPessoaId(pessoaId: number): Promise<Veiculo[]> {
    try {
        const veiculos = await knex(Tabela.VEICULO)
            .where('pessoa_id', pessoaId)
            .select('*');

        return veiculos as Veiculo[];
    } catch (err) {
        console.error(`Erro ao buscar veículos para Pessoa ID ${pessoaId} (Knex):`, err);
        throw err;
    }
}

export default {
    createVeiculo,
    getAllVeiculos,
    getVeiculoById,
    updateVeiculo,
    deleteVeiculo,
    getVeiculosByPessoaId,
};