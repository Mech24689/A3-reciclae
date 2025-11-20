// ms-pessoa/src/routes/pessoa.routes.ts

import { Router } from 'express';
import * as pessoaController from '../controllers/pessoa.controller';

const pessoaRouter = Router();

// Rota de Cadastro/Criação
// POST /pessoas
pessoaRouter.post('/', pessoaController.createPessoa); 
pessoaRouter.get('/', pessoaController.getAllPessoas);
// (Adicione outras rotas de Pessoa: GET, PUT, DELETE aqui)

pessoaRouter.route('/:id')
    .get(pessoaController.getPessoaById)   // ⬅️ ISSO estava faltando
    .put(pessoaController.updatePessoa)
    .delete(pessoaController.deletePessoa);
export default pessoaRouter;