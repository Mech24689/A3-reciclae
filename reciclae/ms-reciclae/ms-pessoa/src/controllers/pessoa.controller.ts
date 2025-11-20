// src/controllers/pessoa.controller.ts

import { Request, Response } from 'express';
import pessoaService from '../services/Pessoa.service';
import { PessoaCreate, PessoaUpdate, PessoaRegistrationInput } from '../models/Pessoa';

// -------------------------------------------------------------------------
// Rota: GET /pessoas
// -------------------------------------------------------------------------
export async function getAllPessoas(req: Request, res: Response): Promise<void> {
  try {
    const pessoas = await pessoaService.getAllPessoas();
    res.status(200).json(pessoas);
  } catch (error) {
    console.error('Erro ao buscar todas as pessoas:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar pessoas.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /pessoas/:id
// -------------------------------------------------------------------------
export async function getPessoaById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de pessoa inválido.' });
    return;
  }

  try {
    const pessoa = await pessoaService.getPessoaById(id);

    if (pessoa) {
      res.status(200).json(pessoa);
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar pessoa ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar pessoa.' });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /pessoas
// -------------------------------------------------------------------------
export async function createPessoa(req: Request, res: Response): Promise<void> {
  const newPessoaData: PessoaRegistrationInput = req.body.pessoa;
  
  
  
  // Validação de campos obrigatórios
  console.log('[pessoa.controller.createPessoa] Dados recebidos para criação de pessoa:', newPessoaData);
  console.log('[pessoa.controller.createPessoa] Dados recebidos para criação de req.body.usuario:', req.body.usuario);

  if (!newPessoaData.nome || !newPessoaData.prefeitura_id) {
    console.log('[pessoa.controller.createPessoa] voltando por erro ');
    res.status(400).json({ message: 'Os campos "nome" e "prefeitura_id" são obrigatórios.' });
    return;
  }
  newPessoaData.senha_texto_puro = req.body.usuario?.senha_texto_puro;
  
  try {
    console.log('[pessoa.controller.createPessoa] executando ');
    const novaPessoa = await pessoaService.createPessoa(newPessoaData);
    console.log('[pessoa.controller.createPessoa] novaPessoa criada novaPessoa.id=', novaPessoa.id);

    res.status(201).json(novaPessoa);
  } catch (error: any) {
    let errorMessage = 'Erro ao criar pessoa.';
    if (error.code === '23505') {
        errorMessage = 'CPF/CNPJ já cadastrado.';
    } else if (error.code === '23503') {
        errorMessage = 'Prefeitura_id não existe.';
    }
    console.error('Erro ao criar pessoa:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: PUT /pessoas/:id
// -------------------------------------------------------------------------
export async function updatePessoa(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: PessoaUpdate = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de pessoa inválido.' });
    return;
  }

  try {
    const pessoaAtualizada = await pessoaService.updatePessoa(id, updateData);

    if (pessoaAtualizada) {
      res.status(200).json(pessoaAtualizada);
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada para atualização.' });
    }
  } catch (error: any) {
    let errorMessage = 'Erro interno do servidor ao atualizar pessoa.';
    if (error.code === '23505') {
        errorMessage = 'CPF/CNPJ já cadastrado ou dado único inválido.';
    }
    console.error(`Erro ao atualizar pessoa ID ${id}:`, error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /pessoas/:id
// -------------------------------------------------------------------------
export async function deletePessoa(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de pessoa inválido.' });
    return;
  }

  try {
    const deletado = await pessoaService.deletePessoa(id);

    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada para deleção.' });
    }
  } catch (error: any) {
    // Tratar erro de Foreign Key (Pessoa é pai de muitas tabelas: Veiculo, Endereco, Notificacao, etc.)
    const errorMessage = error.code === '23503' ? 'Não é possível deletar, pois há registros dependentes (Veículos, Endereços, Contagens) associados a esta pessoa.' : 'Erro interno do servidor ao deletar pessoa.';
    console.error(`Erro ao deletar pessoa ID ${id}:`, error);
    res.status(409).json({ message: errorMessage });
  }
}