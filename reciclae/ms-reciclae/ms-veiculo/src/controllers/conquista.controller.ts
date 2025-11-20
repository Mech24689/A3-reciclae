// src/controllers/conquista.controller.ts

import { Request, Response } from 'express';
import conquistaService from '../services/Conquista.service';
import { ConquistaCreate, ConquistaUpdate } from '../models/Conquista';

// GET /conquistas
export async function getAllConquistas(req: Request, res: Response): Promise<void> {
  try {
    const conquistas = await conquistaService.getAllConquistas();
    res.status(200).json(conquistas);
  } catch (error) {
    console.error('Erro ao buscar conquistas:', error);
    res.status(500).json({ message: 'Erro interno ao buscar conquistas.' });
  }
}

// GET /conquistas/:id
export async function getConquistaById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const conquista = await conquistaService.getConquistaById(id);
    if (conquista) {
      res.status(200).json(conquista);
    } else {
      res.status(404).json({ message: 'Conquista não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar conquista ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao buscar conquista.' });
  }
}

// POST /conquistas
export async function createConquista(req: Request, res: Response): Promise<void> {
  const newData: ConquistaCreate = req.body;
  if (!newData.nome || !newData.pontuacao_minima || !newData.pessoa_id) {
    return void res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  try {
    const novaConquista = await conquistaService.createConquista(newData);
    res.status(201).json(novaConquista);
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Pessoa_id inválida.' : 'Erro ao criar conquista.';
    console.error('Erro ao criar conquista:', error);
    res.status(400).json({ message: msg });
  }
}

// PUT /conquistas/:id
export async function updateConquista(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: ConquistaUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const conquistaAtualizada = await conquistaService.updateConquista(id, updateData);
    if (conquistaAtualizada) {
      res.status(200).json(conquistaAtualizada);
    } else {
      res.status(404).json({ message: 'Conquista não encontrada.' });
    }
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Pessoa_id inválida.' : 'Erro interno ao atualizar.';
    console.error(`Erro ao atualizar conquista ID ${id}:`, error);
    res.status(400).json({ message: msg });
  }
}

// DELETE /conquistas/:id
export async function deleteConquista(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await conquistaService.deleteConquista(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Conquista não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar conquista ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar conquista.' });
  }
}