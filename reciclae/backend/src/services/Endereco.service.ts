// src/services/endereco.service.ts

import knex, { Tabela } from '../knex';
import { Endereco, EnderecoCreate, EnderecoUpdate, EnderecoComPessoa } from '../models/Endereco';

/**
 * Funções CRUD para a tabela Endereco, utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Criar um novo Endereço)
export async function createEndereco(data: EnderecoCreate): Promise<Endereco> {
  try {
    const [novoEndereco] = await knex(Tabela.ENDERECO)
      .insert(data)
      .returning('*');
      
    return novoEndereco as Endereco;
  } catch (err) {
    console.error('Erro ao criar endereço (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Endereços, com nome da Pessoa)
export async function getAllEnderecos(): Promise<EnderecoComPessoa[]> {
  try {
    // JOIN com Pessoa para trazer o nome do proprietário do endereço
    const enderecos = await knex(Tabela.ENDERECO)
      .join(Tabela.PESSOA, `${Tabela.ENDERECO}.pessoa_id`, `${Tabela.PESSOA}.id`)
      .select([
        `${Tabela.ENDERECO}.*`, // Seleciona todos os campos do Endereco
        `${Tabela.PESSOA}.nome as pessoa_nome`, // Adiciona o nome da Pessoa
      ])
      .orderBy(`${Tabela.ENDERECO}.id`);
      
    return enderecos as EnderecoComPessoa[];
  } catch (err) {
    console.error('Erro ao buscar endereços (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Endereço por ID, com nome da Pessoa)
export async function getEnderecoById(id: number): Promise<EnderecoComPessoa | undefined> {
  try {
    const endereco = await knex(Tabela.ENDERECO)
      .join(Tabela.PESSOA, `${Tabela.ENDERECO}.pessoa_id`, `${Tabela.PESSOA}.id`)
      .select([
        `${Tabela.ENDERECO}.*`,
        `${Tabela.PESSOA}.nome as pessoa_nome`,
      ])
      .where(`${Tabela.ENDERECO}.id`, id)
      .first();
      
    return endereco as EnderecoComPessoa | undefined;
  } catch (err) {
    console.error('Erro ao buscar endereço por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Endereço por ID)
export async function updateEndereco(id: number, data: EnderecoUpdate): Promise<Endereco | undefined> {
  try {
    const [enderecoAtualizado] = await knex(Tabela.ENDERECO)
      .where('id', id)
      .update(data)
      .returning('*');

    return enderecoAtualizado as Endereco | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar endereço ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Endereço por ID)
export async function deleteEndereco(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.ENDERECO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar endereço ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. READ por Pessoa (Buscar todos os endereços de uma Pessoa)
export async function getEnderecosByPessoaId(pessoaId: number): Promise<Endereco[]> {
    try {
        const enderecos = await knex(Tabela.ENDERECO)
            .where('pessoa_id', pessoaId)
            .select('*');

        return enderecos as Endereco[];
    } catch (err) {
        console.error(`Erro ao buscar endereços para Pessoa ID ${pessoaId} (Knex):`, err);
        throw err;
    }
}

export default {
    createEndereco,
    getAllEnderecos,
    getEnderecoById,
    updateEndereco,
    deleteEndereco,
    getEnderecosByPessoaId, // Nova função útil
};