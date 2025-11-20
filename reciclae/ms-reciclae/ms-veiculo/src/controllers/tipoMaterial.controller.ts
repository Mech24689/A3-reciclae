// src/controllers/tipoMaterial.controller.ts

import { Request, Response } from 'express';
import tipoMaterialService from '../services/TipoMaterial.service';
import { TipoMaterialCreate, TipoMaterialUpdate } from '../models/TipoMaterial';

// GET /tipos-material
export async function getAllTiposMaterial(req: Request, res: Response): Promise<void> {
  try {
    const tipos = await tipoMaterialService.getAllTiposMaterial();
    res.status(200).json(tipos);
  } catch (error) {
    console.error('Erro ao buscar tipos de material:', error);
    res.status(500).json({ message: 'Erro interno ao buscar tipos de material.' });
  }
}

// GET /tipos-material/:id
export async function getTipoMaterialById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const tipo = await tipoMaterialService.getTipoMaterialById(id);
    if (tipo) {
      res.status(200).json(tipo);
    } else {
      res.status(404).json({ message: 'Tipo de Material não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar Tipo de Material ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao buscar Tipo de Material.' });
  }
}

// POST /tipos-material
export async function createTipoMaterial(req: Request, res: Response): Promise<void> {
  const newData: TipoMaterialCreate = req.body;
  if (!newData.nome) {
    return void res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
  }

  try {
    const novoTipo = await tipoMaterialService.createTipoMaterial(newData);
    res.status(201).json(novoTipo);
  } catch (error: any) {
    const msg = error.code === '23505' ? 'Nome do material já cadastrado.' : 'Erro ao criar tipo de material.';
    console.error('Erro ao criar tipo de material:', error);
    res.status(400).json({ message: msg });
  }
}

// PUT /tipos-material/:id
export async function updateTipoMaterial(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: TipoMaterialUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const tipoAtualizado = await tipoMaterialService.updateTipoMaterial(id, updateData);
    if (tipoAtualizado) {
      res.status(200).json(tipoAtualizado);
    } else {
      res.status(404).json({ message: 'Tipo de Material não encontrado.' });
    }
  } catch (error: any) {
    const msg = error.code === '23505' ? 'Nome do material já cadastrado.' : 'Erro interno ao atualizar.';
    console.error(`Erro ao atualizar Tipo de Material ID ${id}:`, error);
    res.status(400).json({ message: msg });
  }
}

// DELETE /tipos-material/:id
export async function deleteTipoMaterial(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await tipoMaterialService.deleteTipoMaterial(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tipo de Material não encontrado.' });
    }
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Existem contagens de descarte associadas a este material.' : 'Erro interno ao deletar.';
    console.error(`Erro ao deletar Tipo de Material ID ${id}:`, error);
    res.status(409).json({ message: msg });
  }
}