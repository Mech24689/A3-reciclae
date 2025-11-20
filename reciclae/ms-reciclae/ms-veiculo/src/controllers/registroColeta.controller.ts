// src/controllers/registroColeta.controller.ts

import { Request, Response } from 'express';
import registroColetaService from '../services/RegistroColeta.service';
import { RegistroColetaCreate, RegistroColetaUpdate } from '../models/RegistroColeta';

// -------------------------------------------------------------------------
// Rota: GET /registros-coleta
// -------------------------------------------------------------------------
export async function getAllRegistrosColeta(req: Request, res: Response): Promise<void> {
  try {
    const registros = await registroColetaService.getAllRegistrosColeta();
    res.status(200).json(registros);
  } catch (error) {
    console.error('Erro ao buscar todos os Registros de Coleta:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar Registros de Coleta.' });
  }
}

// -------------------------------------------------------------------------
// Rota: GET /registros-coleta/:id
// -------------------------------------------------------------------------
export async function getRegistroColetaById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Registro de Coleta inválido.' });
    return;
  }

  try {
    const registro = await registroColetaService.getRegistroColetaById(id);

    if (registro) {
      res.status(200).json(registro);
    } else {
      res.status(404).json({ message: 'Registro de Coleta não encontrado.' });
    }
  } catch (error) {
    console.error(`Erro ao buscar Registro de Coleta ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar Registro de Coleta.' });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /registros-coleta
// -------------------------------------------------------------------------
export async function createRegistroColeta(req: Request, res: Response): Promise<void> {
  const newRegistroData: RegistroColetaCreate = req.body;

  if (!newRegistroData.veiculo_id || !newRegistroData.pessoa_id || !newRegistroData.ponto_coleta_id || !newRegistroData.data_coleta) {
    res.status(400).json({ message: 'Os campos obrigatórios (veiculo_id, pessoa_id, ponto_coleta_id, data_coleta) devem ser preenchidos.' });
    return;
  }

  try {
    const novoRegistro = await registroColetaService.createRegistroColeta(newRegistroData);
    res.status(201).json(novoRegistro);
  } catch (error: any) {
    let errorMessage = 'Erro ao criar Registro de Coleta.';
    if (error.code === '23503') {
        errorMessage = 'Uma das chaves estrangeiras (Veículo, Pessoa ou Ponto de Coleta) não existe.';
    }
    console.error('Erro ao criar Registro de Coleta:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: PUT /registros-coleta/:id
// -------------------------------------------------------------------------
export async function updateRegistroColeta(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: RegistroColetaUpdate = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Registro de Coleta inválido.' });
    return;
  }

  try {
    const registroAtualizado = await registroColetaService.updateRegistroColeta(id, updateData);

    if (registroAtualizado) {
      res.status(200).json(registroAtualizado);
    } else {
      res.status(404).json({ message: 'Registro de Coleta não encontrado para atualização.' });
    }
  } catch (error: any) {
    let errorMessage = 'Erro interno do servidor ao atualizar Registro de Coleta.';
    if (error.code === '23503') {
        errorMessage = 'Uma das chaves estrangeiras (Veículo, Pessoa ou Ponto de Coleta) não existe.';
    }
    console.error(`Erro ao atualizar Registro de Coleta ID ${id}:`, error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /registros-coleta/:id
// -------------------------------------------------------------------------
export async function deleteRegistroColeta(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de Registro de Coleta inválido.' });
    return;
  }

  try {
    const deletado = await registroColetaService.deleteRegistroColeta(id);

    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Registro de Coleta não encontrado para deleção.' });
    }
  } catch (error) {
    // Tratar erros de FK se outras tabelas referenciarem RegistroColeta
    console.error(`Erro ao deletar Registro de Coleta ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao deletar Registro de Coleta.' });
  }
}