// src/services/participacaoDesafio.service.ts

import knex, { Tabela } from '../knex';
import { ParticipacaoDesafio, ParticipacaoDesafioCreate, ParticipacaoDetalhada } from '../models/ParticipacaoDesafio';

/**
 * Funções CRUD para a tabela ParticipacaoDesafio, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada
const COLUNAS_DETALHES = [
    `${Tabela.PARTICIPACAO_DESAFIO}.*`,
    `${Tabela.PESSOA}.nome as pessoa_nome`,
    `${Tabela.DESAFIO}.titulo as desafio_titulo`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.PARTICIPACAO_DESAFIO)
        .join(Tabela.PESSOA, `${Tabela.PARTICIPACAO_DESAFIO}.pessoa_id`, `${Tabela.PESSOA}.id`)
        .join(Tabela.DESAFIO, `${Tabela.PARTICIPACAO_DESAFIO}.desafio_id`, `${Tabela.DESAFIO}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Registrar a participação de uma Pessoa em um Desafio)
export async function createParticipacao(data: ParticipacaoDesafioCreate): Promise<ParticipacaoDesafio> {
  const dataInsert = {
      ...data,
      data_inscricao: new Date(), // Define a data de inscrição no backend
  };
  
  try {
    const [novaParticipacao] = await knex(Tabela.PARTICIPACAO_DESAFIO)
      .insert(dataInsert)
      .returning('*');
      
    return novaParticipacao as ParticipacaoDesafio;
  } catch (err) {
    // Atenção: Este bloco irá capturar o erro se a combinação (pessoa_id, desafio_id) já existir (UNIQUE constraint)
    console.error('Erro ao criar Participação em Desafio (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todas as Participações, com detalhes)
export async function getAllParticipacoes(): Promise<ParticipacaoDetalhada[]> {
  try {
    const participacoes = await buildDetailedQuery()
      .orderBy(`${Tabela.PARTICIPACAO_DESAFIO}.data_inscricao`, 'desc');
      
    return participacoes as ParticipacaoDetalhada[];
  } catch (err) {
    console.error('Erro ao buscar Participações (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Participações por Pessoa)
export async function getParticipacoesByPessoaId(pessoaId: number): Promise<ParticipacaoDetalhada[]> {
  try {
    const participacoes = await buildDetailedQuery()
      .where(`${Tabela.PARTICIPACAO_DESAFIO}.pessoa_id`, pessoaId)
      .orderBy(`${Tabela.DESAFIO}.data_fim`, 'asc');
      
    return participacoes as ParticipacaoDetalhada[];
  } catch (err) {
    console.error(`Erro ao buscar Participações para Pessoa ID ${pessoaId} (Knex):`, err);
    throw err;
  }
}

// 4. DELETE (Deletar uma Participação por ID)
// Nota: O UPDATE raramente é usado em tabelas pivô, mas se fosse necessário, seria implementado.
export async function deleteParticipacao(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.PARTICIPACAO_DESAFIO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar Participação ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. READ (Verificar se uma pessoa já está participando de um desafio)
export async function getParticipacaoByPessoaAndDesafio(pessoaId: number, desafioId: number): Promise<ParticipacaoDesafio | undefined> {
    try {
        const participacao = await knex(Tabela.PARTICIPACAO_DESAFIO)
            .where({
                pessoa_id: pessoaId,
                desafio_id: desafioId,
            })
            .first();

        return participacao as ParticipacaoDesafio | undefined;
    } catch (err) {
        console.error('Erro ao verificar Participação (Knex):', err);
        throw err;
    }
}

export default {
    createParticipacao,
    getAllParticipacoes,
    getParticipacoesByPessoaId,
    deleteParticipacao,
    getParticipacaoByPessoaAndDesafio,
};