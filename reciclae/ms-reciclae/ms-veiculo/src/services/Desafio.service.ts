// src/services/desafio.service.ts

import knex, { Tabela } from '../knex';
import { Desafio, DesafioCreate, DesafioUpdate } from '../models/Desafio';

/**
 * Funções CRUD para a tabela Desafio, utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Criar um novo Desafio)
export async function createDesafio(data: DesafioCreate): Promise<Desafio> {
  try {
    const [novoDesafio] = await knex(Tabela.DESAFIO)
      .insert(data)
      .returning('*');
      
    return novoDesafio as Desafio;
  } catch (err) {
    console.error('Erro ao criar Desafio (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Desafios)
export async function getAllDesafios(): Promise<Desafio[]> {
  try {
    const desafios = await knex(Tabela.DESAFIO)
      .select('*')
      .orderBy('data_fim', 'desc');
      
    return desafios as Desafio[];
  } catch (err) {
    console.error('Erro ao buscar Desafios (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Desafio por ID)
export async function getDesafioById(id: number): Promise<Desafio | undefined> {
  try {
    const desafio = await knex(Tabela.DESAFIO)
      .where('id', id)
      .first();
      
    return desafio as Desafio | undefined;
  } catch (err) {
    console.error('Erro ao buscar Desafio por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Desafio por ID)
export async function updateDesafio(id: number, data: DesafioUpdate): Promise<Desafio | undefined> {
  try {
    const [desafioAtualizado] = await knex(Tabela.DESAFIO)
      .where('id', id)
      .update(data)
      .returning('*');

    return desafioAtualizado as Desafio | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Desafio ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Desafio por ID)
export async function deleteDesafio(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.DESAFIO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    // Atenção: A tabela ParticipacaoDesafio depende desta tabela.
    console.error(`Erro ao deletar Desafio ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. READ (Buscar Desafios Ativos) - Função extra útil
export async function getDesafiosAtivos(): Promise<Desafio[]> {
    const dataAtual = new Date();
    try {
        const desafios = await knex(Tabela.DESAFIO)
            .where('data_inicio', '<=', dataAtual) // O desafio já iniciou
            .andWhere('data_fim', '>=', dataAtual) // O desafio ainda não terminou
            .select('*')
            .orderBy('data_fim', 'asc'); // Ordena pelo que está acabando primeiro
            
        return desafios as Desafio[];
    } catch (err) {
        console.error('Erro ao buscar Desafios Ativos (Knex):', err);
        throw err;
    }
}


export default {
    createDesafio,
    getAllDesafios,
    getDesafioById,
    updateDesafio,
    deleteDesafio,
    getDesafiosAtivos,
};