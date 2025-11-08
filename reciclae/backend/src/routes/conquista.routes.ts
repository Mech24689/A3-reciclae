// src/routes/conquista.routes.ts

import { Router } from 'express';
import * as conquistaController from '../controllers/conquista.controller';

const conquistaRouter = Router();

// Rota principal: /conquistas
conquistaRouter.route('/')
    .get(conquistaController.getAllConquistas) // GET /conquistas
    .post(conquistaController.createConquista); // POST /conquistas

// Rotas com ID: /conquistas/:id
conquistaRouter.route('/:id')
    .get(conquistaController.getConquistaById) // GET /conquistas/:id
    .put(conquistaController.updateConquista) // PUT /conquistas/:id
    .delete(conquistaController.deleteConquista); // DELETE /conquistas/:id

export default conquistaRouter;