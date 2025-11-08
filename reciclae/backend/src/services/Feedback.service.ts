// src/services/feedback.service.ts

import knex, { Tabela } from '../knex';
import { Feedback, FeedbackCreate, FeedbackUpdate, FeedbackComPessoa } from '../models/Feedback';

/**
 * Funções CRUD para a tabela Feedback, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada
const COLUNAS_DETALHES = [
    `${Tabela.FEEDBACK}.*`,
    `${Tabela.PESSOA}.nome as pessoa_nome`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.FEEDBACK)
        .join(Tabela.PESSOA, `${Tabela.FEEDBACK}.pessoa_id`, `${Tabela.PESSOA}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Enviar um novo Feedback)
export async function createFeedback(data: FeedbackCreate): Promise<Feedback> {
  const dataInsert = {
      ...data,
      data_envio: new Date(), // Define o timestamp de envio
      status_processamento: 'PENDENTE', // Define o status inicial
  };
  
  try {
    const [novoFeedback] = await knex(Tabela.FEEDBACK)
      .insert(dataInsert)
      .returning('*');
      
    return novoFeedback as Feedback;
  } catch (err) {
    console.error('Erro ao criar Feedback (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Feedbacks)
export async function getAllFeedbacks(): Promise<FeedbackComPessoa[]> {
  try {
    const feedbacks = await buildDetailedQuery()
      .orderBy('data_envio', 'desc');
      
    return feedbacks as FeedbackComPessoa[];
  } catch (err) {
    console.error('Erro ao buscar Feedbacks (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Feedback por ID)
export async function getFeedbackById(id: number): Promise<FeedbackComPessoa | undefined> {
  try {
    const feedback = await buildDetailedQuery()
      .where(`${Tabela.FEEDBACK}.id`, id)
      .first();
      
    return feedback as FeedbackComPessoa | undefined;
  } catch (err) {
    console.error('Erro ao buscar Feedback por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Feedback por ID - Usado tipicamente para mudar o status)
export async function updateFeedback(id: number, data: FeedbackUpdate): Promise<Feedback | undefined> {
  try {
    const [feedbackAtualizado] = await knex(Tabela.FEEDBACK)
      .where('id', id)
      .update(data)
      .returning('*');

    return feedbackAtualizado as Feedback | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Feedback ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Feedback por ID)
export async function deleteFeedback(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.FEEDBACK)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar Feedback ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. READ por Status (Buscar Feedbacks por status de processamento)
export async function getFeedbacksByStatus(status: Feedback['status_processamento']): Promise<FeedbackComPessoa[]> {
    try {
        const feedbacks = await buildDetailedQuery()
            .where(`${Tabela.FEEDBACK}.status_processamento`, status)
            .orderBy('data_envio', 'asc');
            
        return feedbacks as FeedbackComPessoa[];
    } catch (err) {
        console.error(`Erro ao buscar Feedbacks por status ${status} (Knex):`, err);
        throw err;
    }
}

export default {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    getFeedbacksByStatus,
};