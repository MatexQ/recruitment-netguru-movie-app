import 'jest';
import faker from 'faker';

import { dal, generateDal } from '@dal';
import { db } from '@models';
import { errors } from '@errors';
import { createMovie, getAllMovies, getSingleMovie } from './movies.service';
import * as utils from '@utils';
import { NotFoundError, UnprocessableEntityError } from '@customErrors';
import * as helpers from '@helpers';

describe('MOVIES FEATURE', () => {
  generateDal(db);

  const id = faker.random.uuid();

  const movieData = {
    title: 'Titanic',
  };

  const movieModel = {
    id: faker.random.uuid(),
    title: faker.lorem.word(),
    year: 2019,
    released: '2018',
    runtime: '194 min',
    genre: faker.lorem.sentence(),
    director: faker.internet.userName(),
    writer: faker.internet.userName(),
    actors: `${faker.internet.userName()}, ${faker.internet.userName()}`,
    plot: faker.lorem.sentence(),
    language: faker.lorem.word(),
    poster: faker.image.imageUrl(),
    metascore: String(faker.random.number()),
  };

  const createMoc = jest.spyOn(dal.movie, 'create');
  const requestMoc = jest.spyOn(utils, 'getMovieFromApi');
  const existsInDBMoc = jest.spyOn(helpers, 'existsInDB');
  const findAllMoc = jest.spyOn(dal.movie, 'findAll');
  const findByPkMoc = jest.spyOn(dal.movie, 'findByPk');

  describe('createMovie', () => {
    beforeEach(() => {
      createMoc.mockReset();
      requestMoc.mockReset();
      existsInDBMoc.mockReset();
    });

    it('should create movie', async () => {
      requestMoc.mockResolvedValue(movieModel);
      createMoc.mockResolvedValue(movieModel);

      expect(await createMovie(movieData));
      expect(createMoc).toHaveBeenCalledTimes(1);
      expect(createMoc).toHaveBeenCalledWith(movieModel);
      expect(requestMoc).toHaveBeenCalledTimes(1);
      expect(requestMoc).toHaveBeenCalledWith(movieData.title);
    });

    it('should throw error if movie cannot be created', async () => {
      requestMoc.mockResolvedValue(null);

      try {
        expect(await createMovie(movieData)).toThrow(NotFoundError);
      } catch (error) {
        expect(error).toEqual(new NotFoundError(errors.CANNOT_FIND_MOVIE));
        expect(requestMoc).toHaveBeenCalledTimes(1);
      }
    });

    it('should throw error if movie exists', async () => {
      existsInDBMoc.mockResolvedValueOnce(true);
      requestMoc.mockResolvedValue(movieModel);

      try {
        expect(await createMovie(movieData)).toThrow(UnprocessableEntityError);
      } catch (error) {
        expect(error).toEqual(new UnprocessableEntityError(errors.MOVIE_EXISTS));
        expect(existsInDBMoc).toHaveBeenCalledTimes(1);
        expect(requestMoc).toHaveBeenCalledTimes(1);
        expect(requestMoc).toHaveBeenCalledWith(movieData.title);
      }
    });

  });

  describe('fetchMovies', () => {
    beforeEach(() => {
      findAllMoc.mockReset();
    });

    it('should return movies', async () => {
      findAllMoc.mockResolvedValue([movieModel]);

      expect(await getAllMovies()).toEqual([movieModel]);
      expect(findAllMoc).toHaveBeenCalledTimes(1);
    });
  });

  describe('get singel movie', () => {
    beforeEach(() => {
      findByPkMoc.mockReset();
    });

    it('should return movie', async () => {
      findByPkMoc.mockResolvedValue(movieModel);

      expect(await getSingleMovie(id)).toEqual(movieModel);
      expect(findByPkMoc).toHaveBeenCalledTimes(1);
    });

    it('should throw if movie does not exist', async () => {
      findByPkMoc.mockResolvedValue(null);

      try {
        expect(await getSingleMovie(id)).toThrow(NotFoundError);
      } catch (error) {
        expect(error).toEqual(new NotFoundError(errors.CANNOT_FIND_MOVIE));
        expect(findByPkMoc).toHaveBeenCalledTimes(1);
      }
    });
  });
});
