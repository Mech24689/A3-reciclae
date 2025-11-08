// src/controllers/recompensa.controller.ts

import { Request, Response } from 'express';
import recompensaService from '../services/Recompensa.service';
import { RecompensaCreate, RecompensaUpdate } from '../models/Recompensa';

// GET /recompensas
export async function getAllRecompensas(req: Request, res: Response): Promise<void> {
  try {
    const recompensas = await recompensaService.getAllRecompensas();
    res.status(200).json(recompensas);
  } catch (error) {
    console.error('Erro ao buscar recompensas:', error);
    res.status(500).json({ message: 'Erro interno ao buscar recompensas.' });
  }
}

// GET /recompensas/:id
export async function getRecompensaById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const recompensa = await recompensaService.getRecompensaById(id);
    if (recompensa) {
      res.status(200).json(recompensa);
    } else {
      res.status(404).json({ message: 'Recompensa não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar recompensa ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao buscar recompensa.' });
  }
}

// POST /recompensas
export async function createRecompensa(req: Request, res: Response): Promise<void> {
  const newData: RecompensaCreate = req.body;
  if (!newData.nome || !newData.pontuacao_necessaria) {
    return void res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  try {
    const novaRecompensa = await recompensaService.createRecompensa(newData);
    res.status(201).json(novaRecompensa);
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Prefeitura_id inválida.' : 'Erro ao criar recompensa.';
    console.error('Erro ao criar recompensa:', error);
    res.status(400).json({ message: msg });
  }
}

// PUT /recompensas/:id
export async function updateRecompensa(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: RecompensaUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const recompensaAtualizada = await recompensaService.updateRecompensa(id, updateData);
    if (recompensaAtualizada) {
      res.status(200).json(recompensaAtualizada);
    } else {
      res.status(404).json({ message: 'Recompensa não encontrada.' });
    }
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Prefeitura_id inválida.' : 'Erro interno ao atualizar.';
    console.error(`Erro ao atualizar recompensa ID ${id}:`, error);
    res.status(400).json({ message: msg });
  }
}

// DELETE /recompensas/:id
export async function deleteRecompensa(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await recompensaService.deleteRecompensa(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Recompensa não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar recompensa ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar recompensa.' });
  }
}