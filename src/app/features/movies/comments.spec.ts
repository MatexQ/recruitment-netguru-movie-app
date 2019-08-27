import 'jest';
import faker from 'faker';

import { dal, generateDal } from '@dal';
import { db } from '@models';
import { errors } from '@errors';
import { createCommentForMovie, getAllCommentsForMovie } from './comments.service';

describe('COMMENTS FEATURE', () => {
  generateDal(db);

  const movieId = faker.random.uuid();

  const commentData = {
    author: faker.internet.userName(),
    comment: faker.lorem.text(),
  };

  const commentModel = {
    id: faker.random.uuid(),
    author: faker.internet.userName(),
    comment: faker.lorem.text(),
    movieId: faker.random.uuid(),
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };

  const createMoc = jest.spyOn(dal.comment, 'create');
  const findAllMoc = jest.spyOn(dal.comment, 'findAll');

  describe('createComment', () => {
    beforeEach(() => {
      createMoc.mockReset();
    });

    it('should create comment', async () => {
      createMoc.mockResolvedValue(commentModel);

      expect(await createCommentForMovie(movieId, commentData));
      expect(createMoc).toHaveBeenCalledTimes(1);
      expect(createMoc).toHaveBeenCalledWith({ ...commentData, movieId });
    });

    it('should throw error if comment cannot be created', async () => {
      try {
        createMoc.mockResolvedValue(null);

        expect(await createCommentForMovie(movieId, commentData)).toThrowError(Error);
      } catch (error) {
        expect(error).toEqual(new Error(errors.UNABLE_TO_CREATE_COMMENT));
        expect(createMoc).toHaveBeenCalledTimes(1);
        expect(createMoc).toHaveBeenCalledWith({ ...commentData, movieId });
      }
    });
  });

  describe('fetchComments', () => {
    beforeEach(() => {
      findAllMoc.mockReset();
    });

    it('should return array comments of movie', async () => {
      const commentDataResult = { ...commentData, movieId };

      findAllMoc.mockResolvedValue([commentDataResult, commentDataResult]);

      expect(await getAllCommentsForMovie(movieId)).toEqual([commentDataResult, commentDataResult]);
      expect(findAllMoc).toHaveBeenCalledTimes(1);
    });
  });
});
