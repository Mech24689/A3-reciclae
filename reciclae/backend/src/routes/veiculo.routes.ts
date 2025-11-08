// src/routes/veiculo.routes.ts

import { Router } from 'express';
import * as veiculoController from '../controllers/veiculo.controller';

const veiculoRouter = Router();

// Rota principal: /veiculos
veiculoRouter.route('/')
    .get(veiculoController.getAllVeiculos) // GET /veiculos
    .post(veiculoController.createVeiculo); // POST /veiculos

// Rotas com ID: /veiculos/:id
veiculoRouter.route('/:id')
    .get(veiculoController.getVeiculoById) // GET /veiculos/:id
    .put(veiculoController.updateVeiculo) // PUT /veiculos/:id
    .delete(veiculoController.deleteVeiculo); // DELETE /veiculos/:id

export default veiculoRouter;