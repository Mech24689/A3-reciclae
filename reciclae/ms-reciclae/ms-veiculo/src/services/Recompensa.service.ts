// src/services/recompensa.service.ts

import knex, { Tabela } from '../knex';
import { Recompensa, RecompensaCreate, RecompensaUpdate, RecompensaComPrefeitura } from '../models/Recompensa';

/**
 * Funções CRUD para a tabela Recompensa, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada
const COLUNAS_DETALHES = [
    `${Tabela.RECOMPENSA}.*`,
    `${Tabela.PREFEITURA}.nome as prefeitura_nome`,
];

// Função auxiliar para construir a query base de JOINs (LEFT JOIN pois prefeitura_id é opcional)
const buildDetailedQuery = () => {
    return knex(Tabela.RECOMPENSA)
        .leftJoin(Tabela.PREFEITURA, `${Tabela.RECOMPENSA}.prefeitura_id`, `${Tabela.PREFEITURA}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Criar uma nova Recompensa)
export async function createRecompensa(data: RecompensaCreate): Promise<Recompensa> {
  try {
    const [novaRecompensa] = await knex(Tabela.RECOMPENSA)
      .insert(data)
      .returning('*');
      
    return novaRecompensa as Recompensa;
  } catch (err) {
    console.error('Erro ao criar Recompensa (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todas as Recompensas, com nome da Prefeitura)
export async function getAllRecompensas(): Promise<RecompensaComPrefeitura[]> {
  try {
    const recompensas = await buildDetailedQuery()
      .orderBy('pontuacao_necessaria', 'asc');
      
    return recompensas as RecompensaComPrefeitura[];
  } catch (err) {
    console.error('Erro ao buscar Recompensas (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Recompensa por ID, com nome da Prefeitura)
export async function getRecompensaById(id: number): Promise<RecompensaComPrefeitura | undefined> {
  try {
    const recompensa = await buildDetailedQuery()
      .where(`${Tabela.RECOMPENSA}.id`, id)
      .first();
      
    return recompensa as RecompensaComPrefeitura | undefined;
  } catch (err) {
    console.error('Erro ao buscar Recompensa por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar uma Recompensa por ID)
export async function updateRecompensa(id: number, data: RecompensaUpdate): Promise<Recompensa | undefined> {
  try {
    const [recompensaAtualizada] = await knex(Tabela.RECOMPENSA)
      .where('id', id)
      .update(data)
      .returning('*');

    return recompensaAtualizada as Recompensa | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Recompensa ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar uma Recompensa por ID)
export async function deleteRecompensa(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.RECOMPENSA)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar Recompensa ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. READ por Prefeitura (Buscar Recompensas de uma Prefeitura específica)
export async function getRecompensasByPrefeituraId(prefeituraId: number): Promise<Recompensa[]> {
    try {
        const recompensas = await knex(Tabela.RECOMPENSA)
            .where('prefeitura_id', prefeituraId)
            .orWhereNull('prefeitura_id') // Pode incluir recompensas globais se prefeitura_id for nulo
            .select('*');

        return recompensas as Recompensa[];
    } catch (err) {
        console.error(`Erro ao buscar Recompensas para Prefeitura ID ${prefeituraId} (Knex):`, err);
        throw err;
    }
}

export default {
    createRecompensa,
    getAllRecompensas,
    getRecompensaById,
    updateRecompensa,
    deleteRecompensa,
    getRecompensasByPrefeituraId,
};