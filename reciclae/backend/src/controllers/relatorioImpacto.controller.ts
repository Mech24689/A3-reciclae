// src/controllers/relatorioImpacto.controller.ts

import { Request, Response } from 'express';
import relatorioService from '../services/RelatorioImpacto.service';
import { RelatorioImpactoCreate, RelatorioImpactoUpdate } from '../models/RelatorioImpacto';

// GET /relatorios-impacto
export async function getAllRelatoriosImpacto(req: Request, res: Response): Promise<void> {
  try {
    const relatorios = await relatorioService.getAllRelatoriosImpacto();
    res.status(200).json(relatorios);
  } catch (error) {
    console.error('Erro ao buscar relatórios de impacto:', error);
    res.status(500).json({ message: 'Erro interno ao buscar relatórios de impacto.' });
  }
}

// GET /relatorios-impacto/:id
export async function getRelatorioImpactoById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const relatorio = await relatorioService.getRelatorioImpactoById(id);
    if (relatorio) {
      res.status(200).json(relatorio);
    } else {
      res.status(404).json({ message: 'Relatório de Impacto não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar Relatório de Impacto ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao buscar Relatório de Impacto.' });
  }
}

// POST /relatorios-impacto
export async function createRelatorioImpacto(req: Request, res: Response): Promise<void> {
  const newData: RelatorioImpactoCreate = req.body;
  if (!newData.material_reciclado_total) {
    return void res.status(400).json({ message: 'O campo "material_reciclado_total" é obrigatório.' });
  }

  try {
    const novoRelatorio = await relatorioService.createRelatorioImpacto(newData);
    res.status(201).json(novoRelatorio);
  } catch (error) {
    console.error('Erro ao criar relatório de impacto:', error);
    res.status(500).json({ message: 'Erro interno ao criar relatório de impacto.' });
  }
}

// PUT /relatorios-impacto/:id
export async function updateRelatorioImpacto(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: RelatorioImpactoUpdate = req.body;
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const relatorioAtualizado = await relatorioService.updateRelatorioImpacto(id, updateData);
    if (relatorioAtualizado) {
      res.status(200).json(relatorioAtualizado);
    } else {
      res.status(404).json({ message: 'Relatório de Impacto não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao atualizar Relatório de Impacto ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao atualizar Relatório de Impacto.' });
  }
}

// DELETE /relatorios-impacto/:id
export async function deleteRelatorioImpacto(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await relatorioService.deleteRelatorioImpacto(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Relatório de Impacto não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar Relatório de Impacto ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar Relatório de Impacto.' });
  }
}