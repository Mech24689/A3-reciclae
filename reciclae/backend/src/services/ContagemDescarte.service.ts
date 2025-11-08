// src/services/contagemDescarte.service.ts

import knex, { Tabela } from '../knex';
import { ContagemDescarte, ContagemDescarteCreate, ContagemDescarteUpdate, ContagemDescarteDetalhada } from '../models/ContagemDescarte';

/**
 * Funções CRUD para a tabela ContagemDescarte, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada (multiplos JOINs)
const COLUNAS_DETALHES = [
    `${Tabela.CONTAGEM_DESCARTE}.*`,
    `${Tabela.PESSOA}.nome as pessoa_nome`,
    `${Tabela.TIPO_MATERIAL}.nome as material_nome`,
    `${Tabela.PONTO_COLETA}.nome as ponto_coleta_nome`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.CONTAGEM_DESCARTE)
        .join(Tabela.PESSOA, `${Tabela.CONTAGEM_DESCARTE}.pessoa_id`, `${Tabela.PESSOA}.id`)
        .join(Tabela.TIPO_MATERIAL, `${Tabela.CONTAGEM_DESCARTE}.tipomaterial_id`, `${Tabela.TIPO_MATERIAL}.id`)
        .join(Tabela.PONTO_COLETA, `${Tabela.CONTAGEM_DESCARTE}.ponto_coleta_id`, `${Tabela.PONTO_COLETA}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Registrar uma nova Contagem de Descarte)
export async function createContagemDescarte(data: ContagemDescarteCreate): Promise<ContagemDescarte> {
    const dataInsert = {
        ...data,
        data_descarte: new Date(), // Define a data de descarte no backend
    };
    
    try {
        const [novoDescarte] = await knex(Tabela.CONTAGEM_DESCARTE)
            .insert(dataInsert)
            .returning('*');
            
        return novoDescarte as ContagemDescarte;
    } catch (err) {
        console.error('Erro ao criar Contagem de Descarte (Knex):', err);
        throw err;
    }
}

// 2. READ (Buscar todos os Descartes, com detalhes de FKs)
export async function getAllContagensDescarte(): Promise<ContagemDescarteDetalhada[]> {
    try {
        const descartes = await buildDetailedQuery()
            .orderBy('data_descarte', 'desc');
            
        return descartes as ContagemDescarteDetalhada[];
    } catch (err) {
        console.error('Erro ao buscar Contagens de Descarte (Knex):', err);
        throw err;
    }
}

// 3. READ (Buscar Descarte por ID)
export async function getContagemDescarteById(id: number): Promise<ContagemDescarteDetalhada | undefined> {
    try {
        const descarte = await buildDetailedQuery()
            .where(`${Tabela.CONTAGEM_DESCARTE}.id`, id)
            .first();
            
        return descarte as ContagemDescarteDetalhada | undefined;
    } catch (err) {
        console.error('Erro ao buscar Contagem de Descarte por ID (Knex):', err);
        throw err;
    }
}

// 4. UPDATE (Atualizar um Descarte por ID)
export async function updateContagemDescarte(id: number, data: ContagemDescarteUpdate): Promise<ContagemDescarte | undefined> {
    try {
        const [descarteAtualizado] = await knex(Tabela.CONTAGEM_DESCARTE)
            .where('id', id)
            .update(data)
            .returning('*');

        return descarteAtualizado as ContagemDescarte | undefined;
    } catch (err) {
        console.error(`Erro ao atualizar Contagem de Descarte ID ${id} (Knex):`, err);
        throw err;
    }
}

// 5. DELETE (Deletar um Descarte por ID)
export async function deleteContagemDescarte(id: number): Promise<boolean> {
    try {
        const linhasDeletadas: number = await knex(Tabela.CONTAGEM_DESCARTE)
            .where('id', id)
            .del();

        return linhasDeletadas > 0;
    } catch (err) {
        console.error(`Erro ao deletar Contagem de Descarte ID ${id} (Knex):`, err);
        throw err;
    }
}

// 6. READ por Pessoa (Buscar histórico de descarte de um cidadão)
export async function getContagensDescarteByPessoaId(pessoaId: number): Promise<ContagemDescarteDetalhada[]> {
    try {
        const descartes = await buildDetailedQuery()
            .where(`${Tabela.CONTAGEM_DESCARTE}.pessoa_id`, pessoaId)
            .orderBy('data_descarte', 'desc');
            
        return descartes as ContagemDescarteDetalhada[];
    } catch (err) {
        console.error(`Erro ao buscar Descartes para Pessoa ID ${pessoaId} (Knex):`, err);
        throw err;
    }
}

export default {
    createContagemDescarte,
    getAllContagensDescarte,
    getContagemDescarteById,
    updateContagemDescarte,
    deleteContagemDescarte,
    getContagensDescarteByPessoaId,
};