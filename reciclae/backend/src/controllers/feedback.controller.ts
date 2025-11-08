// src/controllers/feedback.controller.ts

import { Request, Response } from 'express';
import feedbackService from '../services/Feedback.service';
import { FeedbackCreate, FeedbackUpdate, TipoFeedback } from '../models/Feedback';

// GET /feedbacks
export async function getAllFeedbacks(req: Request, res: Response): Promise<void> {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error);
    res.status(500).json({ message: 'Erro interno ao buscar feedbacks.' });
  }
}

// GET /feedbacks/:id
export async function getFeedbackById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const feedback = await feedbackService.getFeedbackById(id);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: 'Feedback não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar Feedback ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao buscar Feedback.' });
  }
}

// POST /feedbacks
export async function createFeedback(req: Request, res: Response): Promise<void> {
  const newData: FeedbackCreate = req.body;
  if (!newData.conteudo || !newData.pessoa_id || !newData.tipo_feedback) {
    return void res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  // Validação do tipo (simples, assume que TipoFeedback é um Type válido)
  const tiposValidos: TipoFeedback[] = ['SUGESTAO', 'RECLAMACAO', 'PROBLEMA', 'OUTRO'];
  if (!tiposValidos.includes(newData.tipo_feedback as TipoFeedback)) {
      return void res.status(400).json({ message: 'Tipo de feedback inválido.' });
  }

  try {
    const novoFeedback = await feedbackService.createFeedback(newData);
    res.status(201).json(novoFeedback);
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Pessoa_id inválida.' : 'Erro ao criar feedback.';
    console.error('Erro ao criar feedback:', error);
    res.status(400).json({ message: msg });
  }
}

// PUT /feedbacks/:id (Geralmente para mudar o status)
export async function updateFeedback(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: FeedbackUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const feedbackAtualizado = await feedbackService.updateFeedback(id, updateData);
    if (feedbackAtualizado) {
      res.status(200).json(feedbackAtualizado);
    } else {
      res.status(404).json({ message: 'Feedback não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao atualizar Feedback ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao atualizar Feedback.' });
  }
}

// DELETE /feedbacks/:id
export async function deleteFeedback(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await feedbackService.deleteFeedback(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Feedback não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar Feedback ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar Feedback.' });
  }
}