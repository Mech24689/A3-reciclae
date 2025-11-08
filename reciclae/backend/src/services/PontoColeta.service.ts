// src/services/pontoColeta.service.ts

import knex, { Tabela } from '../knex';
import { PontoColeta, PontoColetaCreate, PontoColetaUpdate, PontoColetaComPessoa } from '../models/PontoColeta';

/**
 * Funções CRUD para a tabela PontoColeta, utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Criar um novo Ponto de Coleta)
export async function createPontoColeta(data: PontoColetaCreate): Promise<PontoColeta> {
  try {
    const [novoPonto] = await knex(Tabela.PONTO_COLETA)
      .insert(data)
      .returning('*');
      
    return novoPonto as PontoColeta;
  } catch (err) {
    console.error('Erro ao criar Ponto de Coleta (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Pontos de Coleta, com nome do Responsável)
export async function getAllPontoColetas(): Promise<PontoColetaComPessoa[]> {
  try {
    // LEFT JOIN com Pessoa, pois pessoa_id é opcional
    const pontos = await knex(Tabela.PONTO_COLETA)
      .leftJoin(Tabela.PESSOA, `${Tabela.PONTO_COLETA}.pessoa_id`, `${Tabela.PESSOA}.id`)
      .select([
        `${Tabela.PONTO_COLETA}.*`, // Seleciona todos os campos do PontoColeta
        `${Tabela.PESSOA}.nome as responsavel_nome`, // Adiciona o nome do responsável
      ])
      .orderBy(`${Tabela.PONTO_COLETA}.nome`);
      
    return pontos as PontoColetaComPessoa[];
  } catch (err) {
    console.error('Erro ao buscar Pontos de Coleta (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Ponto de Coleta por ID, com nome do Responsável)
export async function getPontoColetaById(id: number): Promise<PontoColetaComPessoa | undefined> {
  try {
    const ponto = await knex(Tabela.PONTO_COLETA)
      .leftJoin(Tabela.PESSOA, `${Tabela.PONTO_COLETA}.pessoa_id`, `${Tabela.PESSOA}.id`)
      .select([
        `${Tabela.PONTO_COLETA}.*`,
        `${Tabela.PESSOA}.nome as responsavel_nome`,
      ])
      .where(`${Tabela.PONTO_COLETA}.id`, id)
      .first();
      
    return ponto as PontoColetaComPessoa | undefined;
  } catch (err) {
    console.error('Erro ao buscar Ponto de Coleta por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Ponto de Coleta por ID)
export async function updatePontoColeta(id: number, data: PontoColetaUpdate): Promise<PontoColeta | undefined> {
  try {
    const [pontoAtualizado] = await knex(Tabela.PONTO_COLETA)
      .where('id', id)
      .update(data)
      .returning('*');

    return pontoAtualizado as PontoColeta | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Ponto de Coleta ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Ponto de Coleta por ID)
export async function deletePontoColeta(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.PONTO_COLETA)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    // Atenção a erros de Foreign Key, pois RegistroColeta e AgendaColetaRelacionamento dependem desta tabela.
    console.error(`Erro ao deletar Ponto de Coleta ID ${id} (Knex):`, err);
    throw err;
  }
}

export default {
    createPontoColeta,
    getAllPontoColetas,
    getPontoColetaById,
    updatePontoColeta,
    deletePontoColeta,
};