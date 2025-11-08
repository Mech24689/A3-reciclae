// src/controllers/agendaColetaRelacionamento.controller.ts

import { Request, Response } from 'express';
import relacionamentoService from '../services/AgendaColetaRelacionamento.service';
import { AgendaColetaRelacionamentoCreate, AgendaColetaRelacionamentoUpdate } from '../models/AgendaColetaRelacionamento';

// GET /agenda-relacionamentos
export async function getAllRelacionamentos(req: Request, res: Response): Promise<void> {
  try {
    const relacionamentos = await relacionamentoService.getAllRelacionamentos();
    res.status(200).json(relacionamentos);
  } catch (error) {
    console.error('Erro ao buscar relacionamentos de agenda:', error);
    res.status(500).json({ message: 'Erro interno ao buscar relacionamentos.' });
  }
}

// GET /agendas-coleta/:agendaId/pontos
// Esta rota é tipicamente acessada via router aninhado (agendaColeta.routes.ts)
export async function getRelacionamentosByAgendaId(req: Request, res: Response): Promise<void> {
    const agendaId = Number(req.params.agendaId);
    if (Number.isNaN(agendaId)) return void res.status(400).json({ message: 'ID de Agenda inválido.' });
  
    try {
      const relacionamentos = await relacionamentoService.getRelacionamentosByAgendaId(agendaId);
      res.status(200).json(relacionamentos);
    } catch (error) {
      console.error(`Erro ao buscar pontos para Agenda ID ${agendaId}:`, error);
      res.status(500).json({ message: 'Erro interno ao buscar relacionamentos.' });
    }
}

// POST /agenda-relacionamentos
export async function createRelacionamento(req: Request, res: Response): Promise<void> {
  const newData: AgendaColetaRelacionamentoCreate = req.body;
  if (!newData.agendacoleta_id || !newData.pontocoleta_id) {
    return void res.status(400).json({ message: 'Campos agendacoleta_id e pontocoleta_id são obrigatórios.' });
  }

  try {
    // Verifica se a relação já existe antes de criar
    const relacionamentoExistente = await relacionamentoService.getRelacionamentoByAgendaAndPonto(newData.agendacoleta_id, newData.pontocoleta_id);
    if (relacionamentoExistente) {
        return void res.status(409).json({ message: 'Este Ponto de Coleta já está associado a esta Agenda.' });
    }

    const novoRelacionamento = await relacionamentoService.createRelacionamento(newData);
    res.status(201).json(novoRelacionamento);
  } catch (error: any) {
    let errorMessage = 'Erro ao criar relacionamento.';
    if (error.code === '23503') { // Foreign Key violation
        errorMessage = 'ID de Agenda ou Ponto de Coleta inválido.';
    }
    console.error('Erro ao criar relacionamento:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// PUT /agenda-relacionamentos/:id
export async function updateRelacionamento(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: AgendaColetaRelacionamentoUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const relacionamentoAtualizado = await relacionamentoService.updateRelacionamento(id, updateData);
    if (relacionamentoAtualizado) {
      res.status(200).json(relacionamentoAtualizado);
    } else {
      res.status(404).json({ message: 'Relacionamento não encontrado.' });
    }
  } catch (error: any) {
    const msg = error.code === '23505' ? 'Relacionamento duplicado.' : 'Erro interno ao atualizar.';
    console.error(`Erro ao atualizar relacionamento ID ${id}:`, error);
    res.status(400).json({ message: msg });
  }
}

// DELETE /agenda-relacionamentos/:id
export async function deleteRelacionamento(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await relacionamentoService.deleteRelacionamento(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Relacionamento não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar relacionamento ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar relacionamento.' });
  }
}