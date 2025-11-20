// src/routes/feedback.routes.ts

import { Router } from 'express';
import * as feedbackController from '../controllers/feedback.controller';

const feedbackRouter = Router();

// Rota principal: /feedbacks
feedbackRouter.route('/')
    .get(feedbackController.getAllFeedbacks) // GET /feedbacks
    .post(feedbackController.createFeedback); // POST /feedbacks

// Rotas com ID: /feedbacks/:id
feedbackRouter.route('/:id')
    .get(feedbackController.getFeedbackById) // GET /feedbacks/:id
    .put(feedbackController.updateFeedback) // PUT /feedbacks/:id
    .delete(feedbackController.deleteFeedback); // DELETE /feedbacks/:id

export default feedbackRouter;