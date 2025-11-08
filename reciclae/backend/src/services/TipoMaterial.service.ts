// src/services/tipoMaterial.service.ts

import knex from '../knex';
import { TipoMaterial, TipoMaterialCreate, TipoMaterialUpdate } from '../models/TipoMaterial';

const TABLE_NAME = 'TipoMaterial';

/**
 * Busca todos os Tipos de Material cadastrados.
 * @returns Array de TiposMaterial.
 */
async function getAllTiposMaterial(): Promise<TipoMaterial[]> {
  return knex(TABLE_NAME).select('*');
}

/**
 * Busca um Tipo de Material pelo ID.
 * @param id ID do Tipo de Material.
 * @returns TipoMaterial ou null.
 */
async function getTipoMaterialById(id: number): Promise<TipoMaterial | null> {
  const material = await knex(TABLE_NAME).where({ id }).first();
  return material || null;
}

/**
 * Cria um novo Tipo de Material.
 * @param materialData Dados para criação.
 * @returns O TipoMaterial criado.
 */
async function createTipoMaterial(materialData: TipoMaterialCreate): Promise<TipoMaterial> {
  const [newMaterial] = await knex(TABLE_NAME)
    .insert(materialData)
    .returning('*');

  return newMaterial;
}

/**
 * Atualiza um Tipo de Material existente.
 * @param id ID do Tipo de Material a ser atualizado.
 * @param updateData Dados para atualização.
 * @returns O TipoMaterial atualizado ou null se não for encontrado.
 */
async function updateTipoMaterial(id: number, updateData: TipoMaterialUpdate): Promise<TipoMaterial | null> {
  const updated = await knex(TABLE_NAME)
    .where({ id })
    .update({ 
        ...updateData, 
        atualizado_em: knex.fn.now() 
    })
    .returning('*');

  return updated.length ? updated[0] : null;
}

/**
 * Deleta um Tipo de Material.
 * @param id ID do Tipo de Material a ser deletado.
 * @returns true se deletado, false se não encontrado.
 */
async function deleteTipoMaterial(id: number): Promise<boolean> {
  const deletedCount = await knex(TABLE_NAME).where({ id }).del();
  return deletedCount > 0;
}

export default {
  getAllTiposMaterial,
  getTipoMaterialById,
  createTipoMaterial,
  updateTipoMaterial,
  deleteTipoMaterial,
};