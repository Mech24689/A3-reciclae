// src/routes/contagemDescarte.routes.ts

import { Router } from 'express';
import * as contagemController from '../controllers/contagemDescarte.controller';

const contagemDescarteRouter = Router();

// Rota principal: /contagens-descarte
contagemDescarteRouter.route('/')
    .get(contagemController.getAllContagensDescarte) // GET /contagens-descarte
    .post(contagemController.createContagemDescarte); // POST /contagens-descarte

// Rotas com ID: /contagens-descarte/:id
contagemDescarteRouter.route('/:id')
    .get(contagemController.getContagemDescarteById) // GET /contagens-descarte/:id
    .put(contagemController.updateContagemDescarte) // PUT /contagens-descarte/:id
    .delete(contagemController.deleteContagemDescarte); // DELETE /contagens-descarte/:id

export default contagemDescarteRouter;