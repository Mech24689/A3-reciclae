// src/services/conquista.service.ts

import knex, { Tabela } from '../knex';
import { Conquista, ConquistaCreate, ConquistaUpdate, ConquistaComPessoa } from '../models/Conquista';

/**
 * Funções CRUD para a tabela Conquista, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta detalhada
const COLUNAS_DETALHES = [
    `${Tabela.CONQUISTA}.*`,
    `${Tabela.PESSOA}.nome as pessoa_nome`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.CONQUISTA)
        .join(Tabela.PESSOA, `${Tabela.CONQUISTA}.pessoa_id`, `${Tabela.PESSOA}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Registrar uma nova Conquista)
export async function createConquista(data: ConquistaCreate): Promise<Conquista> {
    const dataInsert = {
        ...data,
        data_conquista: new Date(), // Define a data da conquista no backend
    };
    
    try {
        const [novaConquista] = await knex(Tabela.CONQUISTA)
            .insert(dataInsert)
            .returning('*');
            
        return novaConquista as Conquista;
    } catch (err) {
        console.error('Erro ao criar Conquista (Knex):', err);
        throw err;
    }
}

// 2. READ (Buscar todas as Conquistas, com nome da Pessoa)
export async function getAllConquistas(): Promise<ConquistaComPessoa[]> {
    try {
        const conquistas = await buildDetailedQuery()
            .orderBy('data_conquista', 'desc');
            
        return conquistas as ConquistaComPessoa[];
    } catch (err) {
        console.error('Erro ao buscar Conquistas (Knex):', err);
        throw err;
    }
}

// 3. READ (Buscar Conquista por ID)
export async function getConquistaById(id: number): Promise<ConquistaComPessoa | undefined> {
    try {
        const conquista = await buildDetailedQuery()
            .where(`${Tabela.CONQUISTA}.id`, id)
            .first();
            
        return conquista as ConquistaComPessoa | undefined;
    } catch (err) {
        console.error('Erro ao buscar Conquista por ID (Knex):', err);
        throw err;
    }
}

// 4. UPDATE (Atualizar uma Conquista por ID)
export async function updateConquista(id: number, data: ConquistaUpdate): Promise<Conquista | undefined> {
    try {
        const [conquistaAtualizada] = await knex(Tabela.CONQUISTA)
            .where('id', id)
            .update(data)
            .returning('*');

        return conquistaAtualizada as Conquista | undefined;
    } catch (err) {
        console.error(`Erro ao atualizar Conquista ID ${id} (Knex):`, err);
        throw err;
    }
}

// 5. DELETE (Deletar uma Conquista por ID)
export async function deleteConquista(id: number): Promise<boolean> {
    try {
        const linhasDeletadas: number = await knex(Tabela.CONQUISTA)
            .where('id', id)
            .del();

        return linhasDeletadas > 0;
    } catch (err) {
        console.error(`Erro ao deletar Conquista ID ${id} (Knex):`, err);
        throw err;
    }
}

// 6. READ por Pessoa (Buscar todas as Conquistas de uma Pessoa)
export async function getConquistasByPessoaId(pessoaId: number): Promise<Conquista[]> {
    try {
        const conquistas = await knex(Tabela.CONQUISTA)
            .where('pessoa_id', pessoaId)
            .select('*')
            .orderBy('data_conquista', 'desc');
            
        return conquistas as Conquista[];
    } catch (err) {
        console.error(`Erro ao buscar Conquistas para Pessoa ID ${pessoaId} (Knex):`, err);
        throw err;
    }
}

export default {
    createConquista,
    getAllConquistas,
    getConquistaById,
    updateConquista,
    deleteConquista,
    getConquistasByPessoaId,
};