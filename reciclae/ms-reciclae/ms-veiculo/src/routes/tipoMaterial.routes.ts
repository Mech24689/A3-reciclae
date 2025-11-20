// src/routes/tipoMaterial.routes.ts

import { Router } from 'express';
import * as tipoMaterialController from '../controllers/tipoMaterial.controller';

const tipoMaterialRouter = Router();

// Rota principal: /tipos-material
tipoMaterialRouter.route('/')
    .get(tipoMaterialController.getAllTiposMaterial) // GET /tipos-material
    .post(tipoMaterialController.createTipoMaterial); // POST /tipos-material

// Rotas com ID: /tipos-material/:id
tipoMaterialRouter.route('/:id')
    .get(tipoMaterialController.getTipoMaterialById) // GET /tipos-material/:id
    .put(tipoMaterialController.updateTipoMaterial) // PUT /tipos-material/:id
    .delete(tipoMaterialController.deleteTipoMaterial); // DELETE /tipos-material/:id

export default tipoMaterialRouter;