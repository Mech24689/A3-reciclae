// src/controllers/pontoColeta.controller.ts

import { Request, Response } from 'express';
import pontoColetaService from '../services/PontoColeta.service';
import { PontoColetaCreate, PontoColetaUpdate } from '../models/PontoColeta';

// -------------------------------------------------------------------------
// Rota: GET /pontos-coleta
// -------------------------------------------------------------------------
export async function getAllPontoColetas(req: Request, res: Response): Promise<void> {
  try {
    const pontos = await pontoColetaService.getAllPontoColetas();
    res.status(200).json(pontos);
  } catch (error) {
    console.error('Erro ao buscar todos os Pontos de Coleta:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar Pontos de Coleta.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /pontos-coleta/:id
// -------------------------------------------------------------------------
export async function getPontoColetaById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Ponto de Coleta inválido.' });
    return;
  }

  try {
    const ponto = await pontoColetaService.getPontoColetaById(id);

    if (ponto) {
      res.status(200).json(ponto);
    } else {
      res.status(404).json({ message: 'Ponto de Coleta não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar Ponto de Coleta ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar Ponto de Coleta.' });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /pontos-coleta
// -------------------------------------------------------------------------
export async function createPontoColeta(req: Request, res: Response): Promise<void> {
  const newPontoData: PontoColetaCreate = req.body;

  if (!newPontoData.nome) {
    res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
    return;
  }

  try {
    const novoPonto = await pontoColetaService.createPontoColeta(newPontoData);
    res.status(201).json(novoPonto);
  } catch (error: any) {
    let errorMessage = 'Erro ao criar Ponto de Coleta.';
    if (error.code === '23503' && error.detail.includes('pessoa_id')) {
        errorMessage = 'Pessoa_id inválido (Responsável).';
    }
    console.error('Erro ao criar Ponto de Coleta:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: PUT /pontos-coleta/:id
// -------------------------------------------------------------------------
export async function updatePontoColeta(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: PontoColetaUpdate = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Ponto de Coleta inválido.' });
    return;
  }

  try {
    const pontoAtualizado = await pontoColetaService.updatePontoColeta(id, updateData);

    if (pontoAtualizado) {
      res.status(200).json(pontoAtualizado);
    } else {
      res.status(404).json({ message: 'Ponto de Coleta não encontrado para atualização.' });
    }
  } catch (error: any) {
    let errorMessage = 'Erro interno do servidor ao atualizar Ponto de Coleta.';
    if (error.code === '23503' && error.detail.includes('pessoa_id')) {
        errorMessage = 'Pessoa_id inválido (Responsável).';
    }
    console.error(`Erro ao atualizar Ponto de Coleta ID ${id}:`, error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /pontos-coleta/:id
// -------------------------------------------------------------------------
export async function deletePontoColeta(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Ponto de Coleta inválido.' });
    return;
  }

  try {
    const deletado = await pontoColetaService.deletePontoColeta(id);

    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Ponto de Coleta não encontrado para deleção.' });
    }
  } catch (error: any) {
    // Tratamento de FK: PontoColeta é pai de AgendaColetaRelacionamento e RegistroColeta
    const errorMessage = error.code === '23503' ? 'Não é possível deletar, pois há agendamentos ou registros de coleta associados a este ponto.' : 'Erro interno do servidor ao deletar Ponto de Coleta.';
    console.error(`Erro ao deletar Ponto de Coleta ID ${id}:`, error);
    res.status(409).json({ message: errorMessage });
  }
}