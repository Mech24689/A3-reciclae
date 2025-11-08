// src/controllers/notificacao.controller.ts

import { Request, Response } from 'express';
import notificacaoService from '../services/Notificacao.service';
import { NotificacaoCreate, NotificacaoUpdate } from '../models/Notificacao';

// GET /notificacoes
export async function getAllNotificacoes(req: Request, res: Response): Promise<void> {
  try {
    const notificacoes = await notificacaoService.getAllNotificacoes();
    res.status(200).json(notificacoes);
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).json({ message: 'Erro interno ao buscar notificações.' });
  }
}

// GET /pessoas/:pessoaId/notificacoes
export async function getNotificacoesByPessoaId(req: Request, res: Response): Promise<void> {
    const pessoaId = Number(req.params.pessoaId);
    if (Number.isNaN(pessoaId)) return void res.status(400).json({ message: 'ID de Pessoa inválido.' });
  
    try {
      const notificacoes = await notificacaoService.getNotificacoesByPessoaId(pessoaId);
      res.status(200).json(notificacoes);
    } catch (error) {
      console.error(`Erro ao buscar notificações para Pessoa ID ${pessoaId}:`, error);
      res.status(500).json({ message: 'Erro interno ao buscar notificações.' });
    }
}

// POST /notificacoes
export async function createNotificacao(req: Request, res: Response): Promise<void> {
  const newData: NotificacaoCreate = req.body;
  if (!newData.titulo || !newData.pessoa_id) {
    return void res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  try {
    const novaNotificacao = await notificacaoService.createNotificacao(newData);
    res.status(201).json(novaNotificacao);
  } catch (error: any) {
    const msg = error.code === '23503' ? 'Pessoa_id inválida.' : 'Erro ao criar notificação.';
    console.error('Erro ao criar notificação:', error);
    res.status(400).json({ message: msg });
  }
}

// PUT /notificacoes/:id (Geralmente usado para marcar como lida)
export async function updateNotificacao(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: NotificacaoUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const notificacaoAtualizada = await notificacaoService.updateNotificacao(id, updateData);
    if (notificacaoAtualizada) {
      res.status(200).json(notificacaoAtualizada);
    } else {
      res.status(404).json({ message: 'Notificação não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao atualizar notificação ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao atualizar notificação.' });
  }
}

// DELETE /notificacoes/:id
export async function deleteNotificacao(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await notificacaoService.deleteNotificacao(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Notificação não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar notificação ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar notificação.' });
  }
}