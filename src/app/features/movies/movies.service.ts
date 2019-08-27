import { dal } from '@dal';
import { getMovieFromApi } from '@utils';
import { NotFoundError, UnprocessableEntityError } from '@customErrors';
import { errors } from '@errors';
import { existsInDB } from '@helpers';
import { ICreateMovie } from '@interfaces';

const getAllMovies = async () => {
  const getAllMoviesOpts = {
    order: [['createdAt', 'DESC']],
  };

  return dal.movie.findAll(getAllMoviesOpts);
};

const getSingleMovie = async (movieId: string) => {
  const movie = await dal.movie.findByPk(movieId);

  if (!movie) {
    throw new NotFoundError(errors.CANNOT_FIND_MOVIE);
  }

  return movie;
};

const createMovie = async (data: ICreateMovie) => {
  const movie = await getMovieFromApi(data.title);

  if (!movie) {
    throw new NotFoundError(errors.CANNOT_FIND_MOVIE);
  }

  const isExistsInDb = await existsInDB(dal.movie, { title: movie.title });

  if (isExistsInDb) {
    throw new UnprocessableEntityError(errors.MOVIE_EXISTS);
  }

  return dal.movie.create(movie);
};

export { getAllMovies, createMovie, getSingleMovie };
