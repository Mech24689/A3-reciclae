// src/services/agendaColeta.service.ts

import knex, { Tabela } from '../knex';
import { AgendaColeta, AgendaColetaCreate, AgendaColetaUpdate, AgendaColetaComPrefeitura } from '../models/AgendaColeta';

/**
 * Funções CRUD para a tabela AgendaColeta, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada
const COLUNAS_DETALHES = [
    `${Tabela.AGENDA_COLETA}.*`,
    `${Tabela.PREFEITURA}.nome as prefeitura_nome`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.AGENDA_COLETA)
        .join(Tabela.PREFEITURA, `${Tabela.AGENDA_COLETA}.prefeitura_id`, `${Tabela.PREFEITURA}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Criar um novo Agendamento de Coleta)
export async function createAgendaColeta(data: AgendaColetaCreate): Promise<AgendaColeta> {
  try {
    const [novaAgenda] = await knex(Tabela.AGENDA_COLETA)
      .insert(data)
      .returning('*');
      
    return novaAgenda as AgendaColeta;
  } catch (err) {
    console.error('Erro ao criar Agenda de Coleta (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Agendamentos, com nome da Prefeitura)
export async function getAllAgendaColetas(): Promise<AgendaColetaComPrefeitura[]> {
  try {
    const agendas = await buildDetailedQuery()
      .orderBy(`${Tabela.AGENDA_COLETA}.data_semana`)
      .orderBy(`${Tabela.AGENDA_COLETA}.horario_inicio`);
      
    return agendas as AgendaColetaComPrefeitura[];
  } catch (err) {
    console.error('Erro ao buscar Agendas de Coleta (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Agendamento por ID, com nome da Prefeitura)
export async function getAgendaColetaById(id: number): Promise<AgendaColetaComPrefeitura | undefined> {
  try {
    const agenda = await buildDetailedQuery()
      .where(`${Tabela.AGENDA_COLETA}.id`, id)
      .first();
      
    return agenda as AgendaColetaComPrefeitura | undefined;
  } catch (err) {
    console.error('Erro ao buscar Agenda de Coleta por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Agendamento por ID)
export async function updateAgendaColeta(id: number, data: AgendaColetaUpdate): Promise<AgendaColeta | undefined> {
  try {
    const [agendaAtualizada] = await knex(Tabela.AGENDA_COLETA)
      .where('id', id)
      .update(data)
      .returning('*');

    return agendaAtualizada as AgendaColeta | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Agenda de Coleta ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Agendamento por ID)
export async function deleteAgendaColeta(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.AGENDA_COLETA)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    // Atenção: A tabela AgendaColetaRelacionamento depende desta tabela.
    console.error(`Erro ao deletar Agenda de Coleta ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. READ por Prefeitura (Buscar Agendamentos por Prefeitura)
export async function getAgendaColetasByPrefeitura(prefeituraId: number): Promise<AgendaColeta[]> {
  try {
    const agendas = await knex(Tabela.AGENDA_COLETA)
      .where('prefeitura_id', prefeituraId)
      .select('*');
      
    return agendas as AgendaColeta[];
  } catch (err) {
    console.error(`Erro ao buscar Agendas de Coleta para Prefeitura ID ${prefeituraId} (Knex):`, err);
    throw err;
  }
}

export default {
    createAgendaColeta,
    getAllAgendaColetas,
    getAgendaColetaById,
    updateAgendaColeta,
    deleteAgendaColeta,
    getAgendaColetasByPrefeitura,
};