// src/routes/recompensa.routes.ts

import { Router } from 'express';
import * as recompensaController from '../controllers/recompensa.controller';

const recompensaRouter = Router();

// Rota principal: /recompensas
recompensaRouter.route('/')
    .get(recompensaController.getAllRecompensas) // GET /recompensas
    .post(recompensaController.createRecompensa); // POST /recompensas

// Rotas com ID: /recompensas/:id
recompensaRouter.route('/:id')
    .get(recompensaController.getRecompensaById) // GET /recompensas/:id
    .put(recompensaController.updateRecompensa) // PUT /recompensas/:id
    .delete(recompensaController.deleteRecompensa); // DELETE /recompensas/:id

export default recompensaRouter;