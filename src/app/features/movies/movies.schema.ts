import Joi from '@hapi/joi';

const createMovieSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
  }),
};

const getMovie = {
  params: {
    id: Joi.string().uuid().required(),
  },
};

export { createMovieSchema, getMovie };
