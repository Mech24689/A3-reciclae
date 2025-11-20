// src/controllers/prefeitura.controller.ts

import { Request, Response } from 'express';
import prefeituraService from '../services/Prefeitura.service';
import { PrefeituraCreate, PrefeituraUpdate } from '../models/Prefeitura';

// -------------------------------------------------------------------------
// Rota: GET /prefeituras
// -------------------------------------------------------------------------
export async function getAllPrefeituras(req: Request, res: Response): Promise<void> {
  try {
    const prefeituras = await prefeituraService.getAllPrefeituras();
    res.status(200).json(prefeituras);
  } catch (error) {
    console.error('Erro ao buscar todas as prefeituras:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar prefeituras.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /prefeituras/:id
// -------------------------------------------------------------------------
export async function getPrefeituraById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de prefeitura inválido.' });
    return;
  }

  try {
    const prefeitura = await prefeituraService.getPrefeituraById(id);

    if (prefeitura) {
      res.status(200).json(prefeitura);
    } else {
      res.status(404).json({ message: 'Prefeitura não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar prefeitura ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar prefeitura.' });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /prefeituras
// -------------------------------------------------------------------------
export async function createPrefeitura(req: Request, res: Response): Promise<void> {
  const newPrefeituraData: PrefeituraCreate = req.body;

  // Validação básica
  if (!newPrefeituraData.nome) {
    res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
    return;
  }

  try {
    const novaPrefeitura = await prefeituraService.createPrefeitura(newPrefeituraData);
    res.status(201).json(novaPrefeitura);
  } catch (error: any) {
    // Tratar erro de CNPJ duplicado ou validação do banco de dados
    const errorMessage = error.code === '23505' ? 'CNPJ ou dado único já cadastrado.' : 'Erro ao criar prefeitura.';
    console.error('Erro ao criar prefeitura:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: PUT /prefeituras/:id
// -------------------------------------------------------------------------
export async function updatePrefeitura(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: PrefeituraUpdate = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de prefeitura inválido.' });
    return;
  }

  try {
    const prefeituraAtualizada = await prefeituraService.updatePrefeitura(id, updateData);

    if (prefeituraAtualizada) {
      res.status(200).json(prefeituraAtualizada);
    } else {
      res.status(404).json({ message: 'Prefeitura não encontrada para atualização.' });
    }
  } catch (error) {
    console.error(`Erro ao atualizar prefeitura ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar prefeitura.' });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /prefeituras/:id
// -------------------------------------------------------------------------
export async function deletePrefeitura(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de prefeitura inválido.' });
    return;
  }

  try {
    const deletado = await prefeituraService.deletePrefeitura(id);

    if (deletado) {
      res.status(204).send(); // 204 No Content para sucesso na deleção
    } else {
      res.status(404).json({ message: 'Prefeitura não encontrada para deleção.' });
    }
  } catch (error: any) {
    // Tratar erro de Foreign Key (dependência)
    const errorMessage = error.code === '23503' ? 'Não é possível deletar, pois há registros dependentes (Pessoas/Agendas) associados a esta prefeitura.' : 'Erro interno do servidor ao deletar prefeitura.';
    console.error(`Erro ao deletar prefeitura ID ${id}:`, error);
    res.status(409).json({ message: errorMessage }); // 409 Conflict
  }
}