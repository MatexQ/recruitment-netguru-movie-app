import { Request, Response, NextFunction } from 'express';
import * as moviesService from './movies.service';
import * as commentsService from './comments.service';

export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await moviesService.getAllMovies();

    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

export const getSingleMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieId: string = req.params.id;
    const movie = await moviesService.getSingleMovie(movieId);

    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

export const getMovieComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieId: string = req.params.id;
    const movies = await commentsService.getAllCommentsForMovie(movieId);

    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

export const createSingleCommentForMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieId: string = req.params.id;
    const comment = await commentsService.createCommentForMovie(movieId, req.body);

    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await moviesService.createMovie(req.body);

    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};
