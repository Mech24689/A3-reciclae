// src/services/registroColeta.service.ts

import knex, { Tabela } from '../knex';
import { RegistroColeta, RegistroColetaCreate, RegistroColetaUpdate, RegistroColetaDetalhes } from '../models/RegistroColeta';

/**
 * Funções CRUD para a tabela RegistroColeta, utilizando Knex.js e tipagem TypeScript.
 */

// Define as colunas a serem selecionadas na consulta (ajudando na clareza)
const COLUNAS_DETALHES = [
    `${Tabela.REGISTRO_COLETA}.*`,
    `${Tabela.VEICULO}.placa as veiculo_placa`,
    `${Tabela.PESSOA}.nome as responsavel_nome`,
    `${Tabela.PONTO_COLETA}.nome as ponto_coleta_nome`,
];

// Função auxiliar para construir a query base de JOINs
const buildDetailedQuery = () => {
    return knex(Tabela.REGISTRO_COLETA)
        .join(Tabela.VEICULO, `${Tabela.REGISTRO_COLETA}.veiculo_id`, `${Tabela.VEICULO}.id`)
        .join(Tabela.PESSOA, `${Tabela.REGISTRO_COLETA}.pessoa_id`, `${Tabela.PESSOA}.id`)
        .join(Tabela.PONTO_COLETA, `${Tabela.REGISTRO_COLETA}.ponto_coleta_id`, `${Tabela.PONTO_COLETA}.id`)
        .select(COLUNAS_DETALHES);
};


// 1. CREATE (Criar um novo Registro de Coleta)
export async function createRegistroColeta(data: RegistroColetaCreate): Promise<RegistroColeta> {
  try {
    const [novoRegistro] = await knex(Tabela.REGISTRO_COLETA)
      .insert(data)
      .returning('*');
      
    return novoRegistro as RegistroColeta;
  } catch (err) {
    console.error('Erro ao criar Registro de Coleta (Knex):', err);
    throw err;
  }
}

// 2. READ (Buscar todos os Registros de Coleta, com detalhes de FKs)
export async function getAllRegistrosColeta(): Promise<RegistroColetaDetalhes[]> {
  try {
    const registros = await buildDetailedQuery()
      .orderBy(`${Tabela.REGISTRO_COLETA}.data_coleta`, 'desc');
      
    return registros as RegistroColetaDetalhes[];
  } catch (err) {
    console.error('Erro ao buscar Registros de Coleta (Knex):', err);
    throw err;
  }
}

// 3. READ (Buscar Registro de Coleta por ID, com detalhes de FKs)
export async function getRegistroColetaById(id: number): Promise<RegistroColetaDetalhes | undefined> {
  try {
    const registro = await buildDetailedQuery()
      .where(`${Tabela.REGISTRO_COLETA}.id`, id)
      .first();
      
    return registro as RegistroColetaDetalhes | undefined;
  } catch (err) {
    console.error('Erro ao buscar Registro de Coleta por ID (Knex):', err);
    throw err;
  }
}

// 4. UPDATE (Atualizar um Registro de Coleta por ID)
export async function updateRegistroColeta(id: number, data: RegistroColetaUpdate): Promise<RegistroColeta | undefined> {
  try {
    const [registroAtualizado] = await knex(Tabela.REGISTRO_COLETA)
      .where('id', id)
      .update(data)
      .returning('*');

    return registroAtualizado as RegistroColeta | undefined;
  } catch (err) {
    console.error(`Erro ao atualizar Registro de Coleta ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar um Registro de Coleta por ID)
export async function deleteRegistroColeta(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.REGISTRO_COLETA)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    // Atenção: Outras tabelas como TipoMaterial e Feedback podem referenciar RegistroColeta
    console.error(`Erro ao deletar Registro de Coleta ID ${id} (Knex):`, err);
    throw err;
  }
}

export default {
    createRegistroColeta,
    getAllRegistrosColeta,
    getRegistroColetaById,
    updateRegistroColeta,
    deleteRegistroColeta,
};