// src/routes/agendaColetaRelacionamento.routes.ts

import { Router } from 'express';
import * as relacionamentoController from '../controllers/agendaColetaRelacionamento.controller';

const relacionamentoRouter = Router();

// Rota principal: /agenda-relacionamentos
relacionamentoRouter.route('/')
    .get(relacionamentoController.getAllRelacionamentos) // GET /agenda-relacionamentos
    .post(relacionamentoController.createRelacionamento); // POST /agenda-relacionamentos

// Rotas com ID: /agenda-relacionamentos/:id
relacionamentoRouter.route('/:id')
    .put(relacionamentoController.updateRelacionamento) // PUT /agenda-relacionamentos/:id
    .delete(relacionamentoController.deleteRelacionamento); // DELETE /agenda-relacionamentos/:id
    
// Rota aninhada para buscar por Agenda já está em agendaColeta.routes.ts

export default relacionamentoRouter;