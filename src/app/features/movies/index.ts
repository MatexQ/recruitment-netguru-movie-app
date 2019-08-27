import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as moviesSchema from './movies.schema';
import * as commentsSchema from './comments.schema';
import * as moviesController from './movies.controller';

const movieRoutes: Router = Router();

movieRoutes
  .get('/', moviesController.getAllMovies)
  .get('/:id', celebrate(moviesSchema.getMovie), moviesController.getSingleMovie)
  .post('/', celebrate(moviesSchema.createMovieSchema), moviesController.createMovie)
  .get('/:id/comments', celebrate(commentsSchema.getComments), moviesController.getMovieComments)
  .post('/:id/comments', celebrate(commentsSchema.createCommentSchema), moviesController.createSingleCommentForMovie);

export { movieRoutes };
