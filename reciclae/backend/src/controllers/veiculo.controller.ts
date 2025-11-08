// src/controllers/veiculo.controller.ts

import { Request, Response } from 'express';
import veiculoService from '../services/Veiculo.service';
import { VeiculoCreate, VeiculoUpdate } from '../models/Veiculo';

// -------------------------------------------------------------------------
// Rota: GET /veiculos
// -------------------------------------------------------------------------
export async function getAllVeiculos(req: Request, res: Response): Promise<void> {
  try {
    const veiculos = await veiculoService.getAllVeiculos();
    res.status(200).json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar todos os veículos:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar veículos.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /veiculos/:id
// -------------------------------------------------------------------------
export async function getVeiculoById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de veículo inválido.' });
    return;
  }

  try {
    const veiculo = await veiculoService.getVeiculoById(id);

    if (veiculo) {
      res.status(200).json(veiculo);
    } else {
      res.status(404).json({ message: 'Veículo não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar veículo ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar veículo.' });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /veiculos
// -------------------------------------------------------------------------
export async function createVeiculo(req: Request, res: Response): Promise<void> {
  const newVeiculoData: VeiculoCreate = req.body;

  // Validação de campos obrigatórios
  if (!newVeiculoData.placa || !newVeiculoData.pessoa_id) {
    res.status(400).json({ message: 'Os campos "placa" e "pessoa_id" são obrigatórios.' });
    return;
  }

  try {
    const novoVeiculo = await veiculoService.createVeiculo(newVeiculoData);
    res.status(201).json(novoVeiculo);
  } catch (error: any) {
    let errorMessage = 'Erro ao criar veículo.';
    if (error.code === '23505') {
        errorMessage = 'Placa já cadastrada (deve ser única).';
    } else if (error.code === '23503') {
        errorMessage = 'Pessoa_id não existe.';
    }
    console.error('Erro ao criar veículo:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: PUT /veiculos/:id
// -------------------------------------------------------------------------
export async function updateVeiculo(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: VeiculoUpdate = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de veículo inválido.' });
    return;
  }

  try {
    const veiculoAtualizado = await veiculoService.updateVeiculo(id, updateData);

    if (veiculoAtualizado) {
      res.status(200).json(veiculoAtualizado);
    } else {
      res.status(404).json({ message: 'Veículo não encontrado para atualização.' });
    }
  } catch (error: any) {
    let errorMessage = 'Erro interno do servidor ao atualizar veículo.';
    if (error.code === '23505') {
        errorMessage = 'Placa já cadastrada ou dado único inválido.';
    }
    console.error(`Erro ao atualizar veículo ID ${id}:`, error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /veiculos/:id
// -------------------------------------------------------------------------
export async function deleteVeiculo(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de veículo inválido.' });
    return;
  }

  try {
    const deletado = await veiculoService.deleteVeiculo(id);

    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Veículo não encontrado para deleção.' });
    }
  } catch (error: any) {
    // Tratamento de FK: Veículo pode ser referenciado em RegistroColeta
    const errorMessage = error.code === '23503' ? 'Não é possível deletar, pois há registros de coleta associados a este veículo.' : 'Erro interno do servidor ao deletar veículo.';
    console.error(`Erro ao deletar veículo ID ${id}:`, error);
    res.status(409).json({ message: errorMessage });
  }
}