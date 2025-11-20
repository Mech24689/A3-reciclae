// src/controllers/endereco.controller.ts

import { Request, Response } from 'express';
import enderecoService from '../services/Endereco.service';
import { EnderecoCreate, EnderecoUpdate } from '../models/Endereco';

// -------------------------------------------------------------------------
// Rota: GET /enderecos
// -------------------------------------------------------------------------
export async function getAllEnderecos(req: Request, res: Response): Promise<void> {
  try {
    const enderecos = await enderecoService.getAllEnderecos();
    res.status(200).json(enderecos);
  } catch (error) {
    console.error('Erro ao buscar todos os endereços:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar endereços.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /enderecos/:id
// -------------------------------------------------------------------------
export async function getEnderecoById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de endereço inválido.' });
    return;
  }

  try {
    const endereco = await enderecoService.getEnderecoById(id);

    if (endereco) {
      res.status(200).json(endereco);
    } else {
      res.status(404).json({ message: 'Endereço não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar endereço ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar endereço.' });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /enderecos
// -------------------------------------------------------------------------
export async function createEndereco(req: Request, res: Response): Promise<void> {
  const newEnderecoData: EnderecoCreate = req.body;

  // Validação de campos obrigatórios
  if (!newEnderecoData.logradouro || !newEnderecoData.pessoa_id) {
    res.status(400).json({ message: 'Os campos "logradouro" e "pessoa_id" são obrigatórios.' });
    return;
  }

  try {
    const novoEndereco = await enderecoService.createEndereco(newEnderecoData);
    res.status(201).json(novoEndereco);
  } catch (error: any) {
    let errorMessage = 'Erro ao criar endereço.';
    if (error.code === '23503') {
        errorMessage = 'Pessoa_id não existe. O endereço deve ser associado a uma pessoa válida.';
    }
    console.error('Erro ao criar endereço:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: PUT /enderecos/:id
// -------------------------------------------------------------------------
export async function updateEndereco(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: EnderecoUpdate = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de endereço inválido.' });
    return;
  }

  try {
    const enderecoAtualizado = await enderecoService.updateEndereco(id, updateData);

    if (enderecoAtualizado) {
      res.status(200).json(enderecoAtualizado);
    } else {
      res.status(404).json({ message: 'Endereço não encontrado para atualização.' });
    }
  } catch (error: any) {
    let errorMessage = 'Erro interno do servidor ao atualizar endereço.';
    if (error.code === '23503') {
        errorMessage = 'Pessoa_id inválido.';
    }
    console.error(`Erro ao atualizar endereço ID ${id}:`, error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /enderecos/:id
// -------------------------------------------------------------------------
export async function deleteEndereco(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de endereço inválido.' });
    return;
  }

  try {
    const deletado = await enderecoService.deleteEndereco(id);

    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Endereço não encontrado para deleção.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar endereço ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao deletar endereço.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /pessoas/:pessoaId/enderecos
// -------------------------------------------------------------------------
export async function getEnderecosByPessoa(req: Request, res: Response): Promise<void> {
  const pessoaId = Number(req.params.pessoaId);

  if (Number.isNaN(pessoaId)) {
    res.status(400).json({ message: 'ID de pessoa inválido.' });
    return;
  }

  try {
    const enderecos = await enderecoService.getEnderecosByPessoaId(pessoaId);
    res.status(200).json(enderecos);
  } catch (error) {
    console.error(`Erro ao buscar endereços para Pessoa ID ${pessoaId}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar endereços da pessoa.' });
  }
}