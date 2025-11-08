// src/controllers/agendaColeta.controller.ts

import { Request, Response } from 'express';
import agendaColetaService from '../services/AgendaColeta.service';
import { AgendaColetaCreate, AgendaColetaUpdate } from '../models/AgendaColeta';

// -------------------------------------------------------------------------
// Rota: GET /agendas-coleta
// -------------------------------------------------------------------------
export async function getAllAgendaColetas(req: Request, res: Response): Promise<void> {
  try {
    const agendas = await agendaColetaService.getAllAgendaColetas();
    res.status(200).json(agendas);
  } catch (error) {
    console.error('Erro ao buscar todas as Agendas de Coleta:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar Agendas de Coleta.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /agendas-coleta/:id
// -------------------------------------------------------------------------
export async function getAgendaColetaById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Agenda de Coleta inválido.' });
    return;
  }

  try {
    const agenda = await agendaColetaService.getAgendaColetaById(id);

    if (agenda) {
      res.status(200).json(agenda);
    } else {
      res.status(404).json({ message: 'Agenda de Coleta não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar Agenda de Coleta ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar Agenda de Coleta.' });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /agendas-coleta
// -------------------------------------------------------------------------
export async function createAgendaColeta(req: Request, res: Response): Promise<void> {
  const newAgendaData: AgendaColetaCreate = req.body;

  if (!newAgendaData.data_semana || !newAgendaData.prefeitura_id) {
    res.status(400).json({ message: 'Os campos "data_semana" e "prefeitura_id" são obrigatórios.' });
    return;
  }

  try {
    const novaAgenda = await agendaColetaService.createAgendaColeta(newAgendaData);
    res.status(201).json(novaAgenda);
  } catch (error: any) {
    let errorMessage = 'Erro ao criar Agenda de Coleta.';
    if (error.code === '23503') {
        errorMessage = 'Prefeitura_id inválida. Agenda deve estar associada a uma prefeitura existente.';
    }
    console.error('Erro ao criar Agenda de Coleta:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: PUT /agendas-coleta/:id
// -------------------------------------------------------------------------
export async function updateAgendaColeta(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: AgendaColetaUpdate = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Agenda de Coleta inválido.' });
    return;
  }

  try {
    const agendaAtualizada = await agendaColetaService.updateAgendaColeta(id, updateData);

    if (agendaAtualizada) {
      res.status(200).json(agendaAtualizada);
    } else {
      res.status(404).json({ message: 'Agenda de Coleta não encontrada para atualização.' });
    }
  } catch (error: any) {
    let errorMessage = 'Erro interno do servidor ao atualizar Agenda de Coleta.';
    if (error.code === '23503') {
        errorMessage = 'Prefeitura_id inválida.';
    }
    console.error(`Erro ao atualizar Agenda de Coleta ID ${id}:`, error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /agendas-coleta/:id
// -------------------------------------------------------------------------
export async function deleteAgendaColeta(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Agenda de Coleta inválido.' });
    return;
  }

  try {
    const deletado = await agendaColetaService.deleteAgendaColeta(id);

    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Agenda de Coleta não encontrada para deleção.' });
    }
  } catch (error: any) {
    // Tratamento de FK: AgendaColeta é pai de AgendaColetaRelacionamento
    const errorMessage = error.code === '23503' ? 'Não é possível deletar, pois há relacionamentos de pontos de coleta ativos associados a esta agenda.' : 'Erro interno do servidor ao deletar Agenda de Coleta.';
    console.error(`Erro ao deletar Agenda de Coleta ID ${id}:`, error);
    res.status(409).json({ message: errorMessage });
  }
}