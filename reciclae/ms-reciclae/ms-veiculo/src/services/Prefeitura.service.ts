// src/services/prefeitura.service.ts

import knex, { Tabela } from '../knex'; // Presume a configuração do Knex em um módulo './knex'
import { Prefeitura, PrefeituraCreate, PrefeituraUpdate } from '../models/Prefeitura';

/**
 * Funções CRUD (Create, Read, Update, Delete) para a tabela Prefeitura,
 * utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Criar uma nova Prefeitura)
export async function createPrefeitura(data: PrefeituraCreate): Promise<Prefeitura> {
  try {
    const [novaPrefeitura] = await knex(Tabela.PREFEITURA)
      .insert(data)
      .returning('*'); // Retorna o objeto inserido (PostgreSQL)
      
    return novaPrefeitura as Prefeitura; 
  } catch (err) {
    console.error('Erro ao criar prefeitura (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todas as Prefeituras)
export async function getAllPrefeituras(): Promise<Prefeitura[]> {
  try {
    const prefeituras = await knex(Tabela.PREFEITURA)
      .select('*')
      .orderBy('nome');
      
    return prefeituras as Prefeitura[]; 
  } catch (err) {
    console.error('Erro ao buscar prefeituras (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Prefeitura por ID)
export async function getPrefeituraById(id: number): Promise<Prefeitura | undefined> {
  try {
    const prefeitura = await knex(Tabela.PREFEITURA)
      .where('id', id)
      .first(); // .first() retorna o primeiro resultado ou undefined
      
    return prefeitura as Prefeitura | undefined;
  } catch (err) {
    console.error('Erro ao buscar prefeitura por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar uma Prefeitura por ID)
export async function updatePrefeitura(id: number, data: PrefeituraUpdate): Promise<Prefeitura | undefined> {
  try {
    const [prefeituraAtualizada] = await knex(Tabela.PREFEITURA)
      .where('id', id)
      .update(data)
      .returning('*');

    return prefeituraAtualizada as Prefeitura | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar prefeitura ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar uma Prefeitura por ID)
export async function deletePrefeitura(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.PREFEITURA)
      .where('id', id)
      .del();

    return linhasDeletadas > 0; // Retorna true se 1 ou mais linhas foram deletadas
  } catch (err) {
    console.error(`Erro ao deletar prefeitura ID ${id} (Knex):`, err);
    throw err;
  }
}

export default {
    createPrefeitura,
    getAllPrefeituras,
    getPrefeituraById,
    updatePrefeitura,
    deletePrefeitura,
};