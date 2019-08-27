import { Router } from 'express';
import { movieRoutes } from './movies';

export const router = Router();

router
  .use('/movies', movieRoutes);
