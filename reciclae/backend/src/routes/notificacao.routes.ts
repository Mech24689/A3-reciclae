// src/routes/notificacao.routes.ts

import { Router } from 'express';
import * as notificacaoController from '../controllers/notificacao.controller';

const notificacaoRouter = Router();

// Rota principal: /notificacoes
notificacaoRouter.route('/')
    .get(notificacaoController.getAllNotificacoes) // GET /notificacoes
    .post(notificacaoController.createNotificacao); // POST /notificacoes

// Rotas com ID: /notificacoes/:id
notificacaoRouter.route('/:id')
    // Não temos um GET por ID simples no controller, mas o PUT e DELETE
    .put(notificacaoController.updateNotificacao) // PUT /notificacoes/:id (Marcar como lida, por exemplo)
    .delete(notificacaoController.deleteNotificacao); // DELETE /notificacoes/:id
    
// Rota aninhada de Pessoa (já colocada em pessoa.routes.ts)
// notificacaoRouter.get('/pessoa/:pessoaId', notificacaoController.getNotificacoesByPessoaId);

export default notificacaoRouter;