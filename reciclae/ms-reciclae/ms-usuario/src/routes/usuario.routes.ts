// src/routes/usuario.routes.ts

import { Router } from 'express';
import * as usuarioController from '../controllers/usuario.controller';

const usuarioRouter = Router();

// Rotas de Autenticação
//usuarioRouter.post('/register', usuarioController.registerUsuario); // POST /usuarios/register

usuarioRouter.post('/login', usuarioController.loginUsuario);       // POST /usuarios/login
usuarioRouter.post('/create-from-pessoa', usuarioController.createUsuarioFromPessoa);

// Rotas com ID: /usuarios/:id
usuarioRouter.route('/:id')
    // Não temos um GET All simples, mas sim rotas de Autenticação/CRUD por ID
    // .get(usuarioController.getUsuarioById) // Se fosse permitido por ID (não criado no controller)
    .put(usuarioController.updateUsuario)   // PUT /usuarios/:id (Atualiza dados ou senha)
    .delete(usuarioController.deleteUsuario); // DELETE /usuarios/:id

export default usuarioRouter;