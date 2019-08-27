import { dal } from '@dal';
import { errors } from '@errors';
import { ICreateComment } from '@interfaces';

const getAllCommentsForMovie = (movieId: string) => {
  const getCommentsForMovieOpts = {
    where: { movieId },
  };

  return dal.comment.findAll(getCommentsForMovieOpts);
};

const createCommentForMovie = async (movieId: string, data: ICreateComment) => {
  const dataModel = {
    ...data,
    movieId,
  };

  const newComment = await dal.comment.create(dataModel);

  if (!newComment) {
    throw new Error(errors.UNABLE_TO_CREATE_COMMENT);
  }

  return newComment;
};

export { getAllCommentsForMovie, createCommentForMovie };
