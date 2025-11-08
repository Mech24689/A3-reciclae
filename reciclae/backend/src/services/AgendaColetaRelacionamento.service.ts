// src/services/agendaColetaRelacionamento.service.ts

import knex, { Tabela } from '../knex';
import { AgendaColetaRelacionamento, AgendaColetaRelacionamentoCreate, AgendaColetaRelacionamentoUpdate, AgendaRelacionamentoDetalhado } from '../models/AgendaColetaRelacionamento';

const TABLE_NAME = 'AgendaColetaRelacionamento';

/**
 * Funções CRUD para a tabela AgendaColetaRelacionamento, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada
const COLUNAS_DETALHES = [
    `${Tabela.AGENDA_COLETA_RELACIONAMENTO}.*`,
    `${Tabela.AGENDA_COLETA}.data_semana as agenda_dia_semana`,
    `${Tabela.PONTO_COLETA}.nome as ponto_coleta_nome`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.AGENDA_COLETA_RELACIONAMENTO)
        .join(Tabela.AGENDA_COLETA, `${Tabela.AGENDA_COLETA_RELACIONAMENTO}.agendacoleta_id`, `${Tabela.AGENDA_COLETA}.id`)
        .join(Tabela.PONTO_COLETA, `${Tabela.AGENDA_COLETA_RELACIONAMENTO}.pontocoleta_id`, `${Tabela.PONTO_COLETA}.id`)
        .select(COLUNAS_DETALHES);
};

export async function getRelacionamentoByAgendaAndPonto(
    agendaColetaId: number, 
    pontoColetaId: number
): Promise<AgendaColetaRelacionamento | null> {
    const relacionamento = await knex(TABLE_NAME)
        .where({
            agenda_coleta_id: agendaColetaId,
            ponto_coleta_id: pontoColetaId
        })
        .first();

    return relacionamento || null;
}
// 1. CREATE (Registrar um novo relacionamento entre Agendamento e Ponto de Coleta)
export async function createRelacionamento(data: AgendaColetaRelacionamentoCreate): Promise<AgendaColetaRelacionamento> {
  try {
    const [novoRelacionamento] = await knex(Tabela.AGENDA_COLETA_RELACIONAMENTO)
      .insert(data)
      .returning('*');
      
    return novoRelacionamento as AgendaColetaRelacionamento;
  } catch (err) {
    // Captura erro de chave única (UNIQUE constraint)
    console.error('Erro ao criar Relacionamento de Agenda/Ponto (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Relacionamentos)
export async function getAllRelacionamentos(): Promise<AgendaRelacionamentoDetalhado[]> {
  try {
    const relacionamentos = await buildDetailedQuery()
      .orderBy(`${Tabela.AGENDA_COLETA_RELACIONAMENTO}.agendacoleta_id`);
      
    return relacionamentos as AgendaRelacionamentoDetalhado[];
  } catch (err) {
    console.error('Erro ao buscar Relacionamentos de Agenda/Ponto (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Relacionamentos por ID da Agenda)
export async function getRelacionamentosByAgendaId(agendaId: number): Promise<AgendaRelacionamentoDetalhado[]> {
  try {
    const relacionamentos = await buildDetailedQuery()
      .where(`${Tabela.AGENDA_COLETA_RELACIONAMENTO}.agendacoleta_id`, agendaId);
      
    return relacionamentos as AgendaRelacionamentoDetalhado[];
  } catch (err) {
    console.error(`Erro ao buscar Relacionamentos para Agenda ID ${agendaId} (Knex):`, err);
    throw err;
  }
}

// 4. UPDATE (Atualizar campos extras do Relacionamento por ID)
export async function updateRelacionamento(id: number, data: AgendaColetaRelacionamentoUpdate): Promise<AgendaColetaRelacionamento | undefined> {
  try {
    const [relacionamentoAtualizado] = await knex(Tabela.AGENDA_COLETA_RELACIONAMENTO)
      .where('id', id)
      .update(data)
      .returning('*');

    return relacionamentoAtualizado as AgendaColetaRelacionamento | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Relacionamento ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Relacionamento por ID)
export async function deleteRelacionamento(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.AGENDA_COLETA_RELACIONAMENTO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar Relacionamento ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. DELETE (Remover um Ponto de Coleta de uma Agenda específica)
export async function removePontoFromAgenda(agendaId: number, pontoColetaId: number): Promise<boolean> {
    try {
        const linhasDeletadas = await knex(Tabela.AGENDA_COLETA_RELACIONAMENTO)
            .where({
                agendacoleta_id: agendaId,
                pontocoleta_id: pontoColetaId,
            })
            .del();

        return linhasDeletadas > 0;
    } catch (err) {
        console.error(`Erro ao remover Ponto ${pontoColetaId} da Agenda ${agendaId} (Knex):`, err);
        throw err;
    }
}

export default {
    createRelacionamento,
    getAllRelacionamentos,
    getRelacionamentosByAgendaId,
    updateRelacionamento,
    deleteRelacionamento,
    getRelacionamentoByAgendaAndPonto,
    removePontoFromAgenda,
};