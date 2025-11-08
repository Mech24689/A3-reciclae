// src/services/pessoa.service.ts

import knex, { Tabela } from '../knex';
import { Pessoa, PessoaCreate, PessoaUpdate, PessoaComPrefeitura } from '../models/Pessoa';

/**
 * Funções CRUD para a tabela Pessoa, utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Criar uma nova Pessoa)
export async function createPessoa(data: PessoaCreate): Promise<Pessoa> {
  try {
    const [novaPessoa] = await knex(Tabela.PESSOA)
      .insert(data)
      .returning('*');
      
    return novaPessoa as Pessoa;
  } catch (err) {
    console.error('Erro ao criar pessoa (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todas as Pessoas, com nome da Prefeitura)
export async function getAllPessoas(): Promise<PessoaComPrefeitura[]> {
  try {
    // Usamos um JOIN para buscar o nome da prefeitura
    const pessoas = await knex(Tabela.PESSOA)
      .leftJoin(Tabela.PREFEITURA, `${Tabela.PESSOA}.prefeitura_id`, `${Tabela.PREFEITURA}.id`)
      .select([
        `${Tabela.PESSOA}.*`, // Seleciona todos os campos da Pessoa
        `${Tabela.PREFEITURA}.nome as prefeitura_nome`, // Adiciona o nome da prefeitura
        `${Tabela.PREFEITURA}.cnpj as prefeitura_cnpj`, // Adiciona o CNPJ da prefeitura
      ])
      .orderBy(`${Tabela.PESSOA}.nome`);
      
    return pessoas as PessoaComPrefeitura[];
  } catch (err) {
    console.error('Erro ao buscar pessoas (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Pessoa por ID, com nome da Prefeitura)
export async function getPessoaById(id: number): Promise<PessoaComPrefeitura | undefined> {
  try {
    const pessoa = await knex(Tabela.PESSOA)
      .leftJoin(Tabela.PREFEITURA, `${Tabela.PESSOA}.prefeitura_id`, `${Tabela.PREFEITURA}.id`)
      .select([
        `${Tabela.PESSOA}.*`,
        `${Tabela.PREFEITURA}.nome as prefeitura_nome`,
        `${Tabela.PREFEITURA}.cnpj as prefeitura_cnpj`,
      ])
      .where(`${Tabela.PESSOA}.id`, id)
      .first();
      
    return pessoa as PessoaComPrefeitura | undefined;
  } catch (err) {
    console.error('Erro ao buscar pessoa por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar uma Pessoa por ID)
export async function updatePessoa(id: number, data: PessoaUpdate): Promise<Pessoa | undefined> {
  try {
    const [pessoaAtualizada] = await knex(Tabela.PESSOA)
      .where('id', id)
      .update(data)
      .returning('*');

    return pessoaAtualizada as Pessoa | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar pessoa ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar uma Pessoa por ID)
export async function deletePessoa(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.PESSOA)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar pessoa ID ${id} (Knex):`, err);
    throw err;
  }
}

export default {
    createPessoa,
    getAllPessoas,
    getPessoaById,
    updatePessoa,
    deletePessoa,
};