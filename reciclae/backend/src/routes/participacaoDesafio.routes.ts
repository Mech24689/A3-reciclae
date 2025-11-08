// src/routes/participacaoDesafio.routes.ts

import { Router } from 'express';
import * as participacaoController from '../controllers/participacaoDesafio.controller';

const participacaoDesafioRouter = Router();

// Rota principal: /participacoes
participacaoDesafioRouter.route('/')
    .get(participacaoController.getAllParticipacoes) // GET /participacoes
    .post(participacaoController.createParticipacao); // POST /participacoes

// Rota com ID (para DELETE): /participacoes/:id
participacaoDesafioRouter.delete('/:id', participacaoController.deleteParticipacao); // DELETE /participacoes/:id

// Rota aninhada de Pessoa (para buscar as participações de um usuário)
// Esta rota está em `pessoa.routes.ts`, mas se fosse separada ficaria assim:
// participacaoDesafioRouter.get('/pessoa/:pessoaId', participacaoController.getParticipacoesByPessoaId); 
// Como já colocamos em pessoa.routes.ts, vamos manter assim por organização.

export default participacaoDesafioRouter;