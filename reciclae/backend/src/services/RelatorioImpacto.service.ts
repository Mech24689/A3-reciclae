// src/services/relatorioImpacto.service.ts

import knex, { Tabela } from '../knex';
import { RelatorioImpacto, RelatorioImpactoCreate, RelatorioImpactoUpdate } from '../models/RelatorioImpacto';

/**
 * Funções CRUD para a tabela RelatorioImpacto, utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Gerar um novo Relatório de Impacto)
export async function createRelatorioImpacto(data: RelatorioImpactoCreate): Promise<RelatorioImpacto> {
  const dataInsert = {
      ...data,
      data_geracao: new Date(), // Define o timestamp de geração
  };
  
  try {
    const [novoRelatorio] = await knex(Tabela.RELATORIO_IMPACTO)
      .insert(dataInsert)
      .returning('*');
      
    return novoRelatorio as RelatorioImpacto;
  } catch (err) {
    console.error('Erro ao criar Relatório de Impacto (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Relatórios)
export async function getAllRelatoriosImpacto(): Promise<RelatorioImpacto[]> {
  try {
    const relatorios = await knex(Tabela.RELATORIO_IMPACTO)
      .select('*')
      .orderBy('data_geracao', 'desc');
      
    return relatorios as RelatorioImpacto[];
  } catch (err) {
    console.error('Erro ao buscar Relatórios de Impacto (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Relatório por ID)
export async function getRelatorioImpactoById(id: number): Promise<RelatorioImpacto | undefined> {
  try {
    const relatorio = await knex(Tabela.RELATORIO_IMPACTO)
      .where('id', id)
      .first();
      
    return relatorio as RelatorioImpacto | undefined;
  } catch (err) {
    console.error('Erro ao buscar Relatório de Impacto por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Relatório por ID)
export async function updateRelatorioImpacto(id: number, data: RelatorioImpactoUpdate): Promise<RelatorioImpacto | undefined> {
  try {
    const [relatorioAtualizado] = await knex(Tabela.RELATORIO_IMPACTO)
      .where('id', id)
      .update(data)
      .returning('*');

    return relatorioAtualizado as RelatorioImpacto | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Relatório de Impacto ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Relatório por ID)
export async function deleteRelatorioImpacto(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.RELATORIO_IMPACTO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar Relatório de Impacto ID ${id} (Knex):`, err);
    throw err;
  }
}

export default {
    createRelatorioImpacto,
    getAllRelatoriosImpacto,
    getRelatorioImpactoById,
    updateRelatorioImpacto,
    deleteRelatorioImpacto,
};