// src/routes/pessoa.routes.ts

import { Router } from 'express';
import * as pessoaController from '../controllers/pessoa.controller';
import * as enderecoController from '../controllers/endereco.controller'; // Necessário para rotas aninhadas
import * as veiculoController from '../controllers/veiculo.controller';

const pessoaRouter = Router();

// Rota principal: /pessoas
pessoaRouter.route('/')
    .get(pessoaController.getAllPessoas) // GET /pessoas
    .post(pessoaController.createPessoa); // POST /pessoas

// Rotas com ID: /pessoas/:id
pessoaRouter.route('/:id')
    .get(pessoaController.getPessoaById) // GET /pessoas/:id
    .put(pessoaController.updatePessoa) // PUT /pessoas/:id
    .delete(pessoaController.deletePessoa); // DELETE /pessoas/:id

// Rota aninhada para buscar endereços de uma pessoa: /pessoas/:pessoaId/enderecos
// O ID é chamado de 'pessoaId' aqui para evitar conflito de nomenclatura no controller

pessoaRouter.route('/:pessoaId/enderecos')
    .get(enderecoController.getEnderecosByPessoa); // GET /pessoas/:pessoaId/enderecos

pessoaRouter.route('/:pessoaId/veiculos')
    .get(veiculoController.getVeiculosByPessoaId);  // GET /pessoas/:pessoaId/veiculos
    
export default pessoaRouter;