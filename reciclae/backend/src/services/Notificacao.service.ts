// src/services/notificacao.service.ts

import knex, { Tabela } from '../knex';
import { Notificacao, NotificacaoCreate, NotificacaoUpdate, NotificacaoComPessoa } from '../models/Notificacao';

/**
 * Funções CRUD para a tabela Notificacao, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada
const COLUNAS_DETALHES = [
    `${Tabela.NOTIFICACAO}.*`,
    `${Tabela.PESSOA}.nome as pessoa_nome`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.NOTIFICACAO)
        .join(Tabela.PESSOA, `${Tabela.NOTIFICACAO}.pessoa_id`, `${Tabela.PESSOA}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Enviar uma nova Notificação)
export async function createNotificacao(data: NotificacaoCreate): Promise<Notificacao> {
  const dataInsert = {
      ...data,
      data_envio: new Date(), // Define o timestamp de envio
      lida: data.lida !== undefined ? data.lida : false, // Garante que 'lida' tem valor padrão
  };
  
  try {
    const [novaNotificacao] = await knex(Tabela.NOTIFICACAO)
      .insert(dataInsert)
      .returning('*');
      
    return novaNotificacao as Notificacao;
  } catch (err) {
    console.error('Erro ao criar Notificação (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todas as Notificações, com nome do destinatário)
export async function getAllNotificacoes(): Promise<NotificacaoComPessoa[]> {
  try {
    const notificacoes = await buildDetailedQuery()
      .orderBy('data_envio', 'desc');
      
    return notificacoes as NotificacaoComPessoa[];
  } catch (err) {
    console.error('Erro ao buscar Notificações (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Notificações por ID do Destinatário)
export async function getNotificacoesByPessoaId(pessoaId: number): Promise<NotificacaoComPessoa[]> {
  try {
    const notificacoes = await buildDetailedQuery()
      .where(`${Tabela.NOTIFICACAO}.pessoa_id`, pessoaId)
      .orderBy('data_envio', 'desc');
      
    return notificacoes as NotificacaoComPessoa[];
  } catch (err) {
    console.error(`Erro ao buscar Notificações para Pessoa ID ${pessoaId} (Knex):`, err);
    throw err;
  }
}

// 4. UPDATE (Atualizar uma Notificação por ID - Usado para marcar como lida)
export async function updateNotificacao(id: number, data: NotificacaoUpdate): Promise<Notificacao | undefined> {
  try {
    const [notificacaoAtualizada] = await knex(Tabela.NOTIFICACAO)
      .where('id', id)
      .update(data)
      .returning('*');

    return notificacaoAtualizada as Notificacao | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Notificação ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar uma Notificação por ID)
export async function deleteNotificacao(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.NOTIFICACAO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar Notificação ID ${id} (Knex):`, err);
    throw err;
  }
}

// 6. Bulk Update (Marcar todas as notificações de uma pessoa como lidas)
export async function markAllAsReadByPessoaId(pessoaId: number): Promise<number> {
    try {
        const linhasAtualizadas = await knex(Tabela.NOTIFICACAO)
            .where('pessoa_id', pessoaId)
            .andWhere('lida', false)
            .update({ lida: true });

        return linhasAtualizadas;
    } catch (err) {
        console.error(`Erro ao marcar notificações da Pessoa ID ${pessoaId} como lidas (Knex):`, err);
        throw err;
    }
}

export default {
    createNotificacao,
    getAllNotificacoes,
    getNotificacoesByPessoaId,
    updateNotificacao,
    deleteNotificacao,
    markAllAsReadByPessoaId,
};