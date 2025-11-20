// src/routes/endereco.routes.ts

import { Router } from 'express';
import * as enderecoController from '../controllers/endereco.controller';

const enderecoRouter = Router();

// Rota principal: /enderecos
enderecoRouter.route('/')
    .get(enderecoController.getAllEnderecos) // GET /enderecos
    .post(enderecoController.createEndereco); // POST /enderecos

// Rotas com ID: /enderecos/:id
enderecoRouter.route('/:id')
    .get(enderecoController.getEnderecoById) // GET /enderecos/:id
    .put(enderecoController.updateEndereco) // PUT /enderecos/:id
    .delete(enderecoController.deleteEndereco); // DELETE /enderecos/:id

export default enderecoRouter;