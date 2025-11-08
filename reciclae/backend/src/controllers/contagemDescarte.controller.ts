// src/controllers/contagemDescarte.controller.ts

import { Request, Response } from 'express';
import contagemService from '../services/ContagemDescarte.service';
import { ContagemDescarteCreate, ContagemDescarteUpdate } from '../models/ContagemDescarte';

// GET /contagens-descarte
export async function getAllContagensDescarte(req: Request, res: Response): Promise<void> {
  try {
    const contagens = await contagemService.getAllContagensDescarte();
    res.status(200).json(contagens);
  } catch (error) {
    console.error('Erro ao buscar contagens de descarte:', error);
    res.status(500).json({ message: 'Erro interno ao buscar contagens de descarte.' });
  }
}

// GET /contagens-descarte/:id
export async function getContagemDescarteById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const contagem = await contagemService.getContagemDescarteById(id);
    if (contagem) {
      res.status(200).json(contagem);
    } else {
      res.status(404).json({ message: 'Contagem de Descarte não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar Contagem de Descarte ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao buscar Contagem de Descarte.' });
  }
}

// POST /contagens-descarte
export async function createContagemDescarte(req: Request, res: Response): Promise<void> {
  const newData: ContagemDescarteCreate = req.body;
  if (!newData.quantidade || !newData.pessoa_id || !newData.tipomaterial_id || !newData.ponto_coleta_id) {
    return void res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  try {
    const novaContagem = await contagemService.createContagemDescarte(newData);
    res.status(201).json(novaContagem);
  } catch (error: any) {
    let errorMessage = 'Erro ao registrar descarte.';
    if (error.code === '23503') {
        errorMessage = 'Pessoa, Material ou Ponto de Coleta inválido.';
    }
    console.error('Erro ao criar contagem de descarte:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// PUT /contagens-descarte/:id
export async function updateContagemDescarte(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: ContagemDescarteUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const contagemAtualizada = await contagemService.updateContagemDescarte(id, updateData);
    if (contagemAtualizada) {
      res.status(200).json(contagemAtualizada);
    } else {
      res.status(404).json({ message: 'Contagem de Descarte não encontrada.' });
    }
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Pessoa, Material ou Ponto de Coleta inválido.' : 'Erro interno ao atualizar.';
    console.error(`Erro ao atualizar Contagem de Descarte ID ${id}:`, error);
    res.status(400).json({ message: msg });
  }
}

// DELETE /contagens-descarte/:id
export async function deleteContagemDescarte(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await contagemService.deleteContagemDescarte(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contagem de Descarte não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar Contagem de Descarte ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar Contagem de Descarte.' });
  }
}