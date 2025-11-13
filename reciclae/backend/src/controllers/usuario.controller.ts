// src/controllers/usuario.controller.ts

import { Request, Response } from 'express';
import usuarioService from '../services/Usuario.service';
import { UsuarioCreate, UsuarioUpdate } from '../models/Usuario';

// -------------------------------------------------------------------------
// Rota: POST /usuarios/register
// -------------------------------------------------------------------------
export async function registerUsuario(req: Request, res: Response): Promise<void> {
  const newUserData: UsuarioCreate = req.body;

  console.log('Dados recebidos para registro de usuário:', newUserData);

  if (!newUserData.login || !newUserData.senha_texto_puro || !newUserData.tipo || !newUserData.prefeitura_id) {
    res.status(400).json({ message: 'Os campos obrigatórios (login, senha_texto_puro, tipo, prefeitura_id) não foram preenchidos.' });
    return;
  }

  try {
    // O service já faz o hash e retorna o objeto sem a senha
    const novoUsuario = await usuarioService.createUsuario(newUserData);
    res.status(201).json(novoUsuario);
  } catch (error: any) {
    let errorMessage = 'Erro ao registrar usuário.';
    if (error.code === '23505') {
        errorMessage = 'Login já em uso (deve ser único).';
    } else if (error.code === '23503') {
        errorMessage = 'Prefeitura_id não existe.';
    }
    console.error('Erro ao registrar usuário:', error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: POST /usuarios/login (EXEMPLO SIMPLES DE AUTENTICAÇÃO)
// -------------------------------------------------------------------------
export async function loginUsuario(req: Request, res: Response): Promise<void> {
    console.log("Dados de login recebidos:", req.body);
    const { login, senha } = req.body;

    if (!login || !senha) {
        res.status(400).json({ message: 'Login e senha são obrigatórios.' });
        return;
    }

    try {
        console.log("linha 49: login:", login);
        const usuarioDB = await usuarioService.getUsuarioByLogin(login);
        console.log("linha 51: usuarioDB:", usuarioDB);
        
        if (!usuarioDB) {
            res.status(401).json({ message: 'Credenciais inválidas.' });
            return;
        }

        
        // Verifica a senha
        const senhaValida = await usuarioService.verifyPassword(senha, usuarioDB.senha);

        if (senhaValida) {
            // Em uma aplicação real, aqui você geraria um JWT (JSON Web Token)
            const { senha: _, ...usuarioLogado } = usuarioDB; // Remove o hash da senha
            res.status(200).json({ 
                message: 'Login bem-sucedido!',
                usuario: usuarioLogado,
                // token: 'SEU_JWT_AQUI' 
            });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }
    } catch (error) {
        console.error('73: Erro durante o login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

// -------------------------------------------------------------------------
// Rota: PUT /usuarios/:id (Atualização de dados ou senha)
// -------------------------------------------------------------------------
export async function updateUsuario(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const updateData: UsuarioUpdate = req.body; // Aceita 'senha' (texto puro) ou outros campos

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de usuário inválido.' });
    return;
  }
  
  // Nota: O serviço de updateUsuario espera o HASH da senha, se for enviada.
  // Neste ponto, assumimos que o cliente envia a senha em texto puro ou o controller lida com o hash.
  // Para simplificar, o serviço Usuario trata a hashagem da senha.
  
  try {
    const usuarioAtualizado = await usuarioService.updateUsuario(id, updateData);

    if (usuarioAtualizado) {
      res.status(200).json(usuarioAtualizado); // Retorna objeto sem senha
    } else {
      res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
    }
  } catch (error: any) {
    let errorMessage = 'Erro interno do servidor ao atualizar usuário.';
    if (error.code === '23503') {
        errorMessage = 'Prefeitura_id inválido.';
    }
    console.error(`Erro ao atualizar usuário ID ${id}:`, error);
    res.status(400).json({ message: errorMessage });
  }
}

// -------------------------------------------------------------------------
// Rota: DELETE /usuarios/:id
// -------------------------------------------------------------------------
export async function deleteUsuario(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID de usuário inválido.' });
    return;
  }

  try {
    const deletado = await usuarioService.deleteUsuario(id);

    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Usuário não encontrado para deleção.' });
    }
  } catch (error) {
    console.error(`Erro ao deletar usuário ID ${id}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' });
  }
}