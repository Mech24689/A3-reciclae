// src/controllers/participacaoDesafio.controller.ts

import { Request, Response } from 'express';
import participacaoService from '../services/ParticipacaoDesafio.service';
import { ParticipacaoDesafioCreate } from '../models/ParticipacaoDesafio';

// GET /participacoes
export async function getAllParticipacoes(req: Request, res: Response): Promise<void> {
  try {
    const participacoes = await participacaoService.getAllParticipacoes();
    res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participações:', error);
    res.status(500).json({ message: 'Erro interno ao buscar participações.' });
  }
}

// GET /pessoas/:pessoaId/participacoes
export async function getParticipacoesByPessoaId(req: Request, res: Response): Promise<void> {
    const pessoaId = Number(req.params.pessoaId);
    if (Number.isNaN(pessoaId)) return void res.status(400).json({ message: 'ID de Pessoa inválido.' });
  
    try {
      const participacoes = await participacaoService.getParticipacoesByPessoaId(pessoaId);
      res.status(200).json(participacoes);
    } catch (error) {
      console.error(`Erro ao buscar participações para Pessoa ID ${pessoaId}:`, error);
      res.status(500).json({ message: 'Erro interno ao buscar participações.' });
    }
}


// POST /participacoes
export async function createParticipacao(req: Request, res: Response): Promise<void> {
  const newData: ParticipacaoDesafioCreate = req.body;
  if (!newData.pessoa_id || !newData.desafio_id) {
    return void res.status(400).json({ message: 'Campos pessoa_id e desafio_id são obrigatórios.' });
  }

  try {
    const participacaoExistente = await participacaoService.getParticipacaoByPessoaAndDesafio(newData.pessoa_id, newData.desafio_id);
    if (participacaoExistente) {
        return void res.status(409).json({ message: 'Pessoa já está participando deste desafio.' });
    }

    const novaParticipacao = await participacaoService.createParticipacao(newData);
    res.status(201).json(novaParticipacao);
  } catch (error: any) {
    let errorMessage = 'Erro ao registrar participação.';
    if (error.code === '23503') { // Foreign Key violation
        errorMessage = 'Pessoa_id ou Desafio_id inválido.';
    }
    console.error('Erro ao criar participação:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// DELETE /participacoes/:id
export async function deleteParticipacao(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return void res.status(400).json({ message: 'ID inválido.' });

  try {
    const deletado = await participacaoService.deleteParticipacao(id);
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Participação não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar participação ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno ao deletar participação.' });
  }
}