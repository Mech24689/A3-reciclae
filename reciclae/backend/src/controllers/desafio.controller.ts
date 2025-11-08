// src/controllers/desafio.controller.ts

import { Request, Response } from 'express';
import desafioService from '../services/Desafio.service';
import { DesafioCreate, DesafioUpdate } from '../models/Desafio';

// GET /desafios
export async function getAllDesafios(req: Request, res: Response): Promise<void> {
  try {
    const desafios = await desafioService.getAllDesafios();
    res.status(200).json(desafios);
  } catch (error) {
    console.error('Erro ao buscar desafios:', error);
    res.status(500).json({ message: 'Erro interno ao buscar desafios.' });
  }
}

// GET /desafios/:id
export async function getDesafioById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const desafio = await desafioService.getDesafioById(id);
    if (desafio) {
      res.status(200).json(desafio);
    } else {
      res.status(404).json({ message: 'Desafio não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar desafio ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao buscar desafio.' });
  }
}

// POST /desafios
export async function createDesafio(req: Request, res: Response): Promise<void> {
  const newDesafioData: DesafioCreate = req.body;
  if (!newDesafioData.titulo || !newDesafioData.data_inicio || !newDesafioData.data_fim) {
    return void res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  try {
    const novoDesafio = await desafioService.createDesafio(newDesafioData);
    res.status(201).json(novoDesafio);
  } catch (error: any) {
    console.error('Erro ao criar desafio:', error);
    res.status(400).json({ message: 'Erro ao criar desafio. Verifique os dados.' });
  }
}

// PUT /desafios/:id
export async function updateDesafio(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: DesafioUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const desafioAtualizado = await desafioService.updateDesafio(id, updateData);
    if (desafioAtualizado) {
      res.status(200).json(desafioAtualizado);
    } else {
      res.status(404).json({ message: 'Desafio não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao atualizar desafio ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao atualizar desafio.' });
  }
}

// DELETE /desafios/:id
export async function deleteDesafio(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await desafioService.deleteDesafio(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Desafio não encontrado.' });
    }
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Existem participações associadas a este desafio.' : 'Erro interno ao deletar.';
    console.error(`Erro ao deletar desafio ID ${id}:`, error);
    res.status(409).json({ message: msg });
  }
}