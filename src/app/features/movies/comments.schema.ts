import Joi from '@hapi/joi';

const createCommentSchema = {
  body: Joi.object().keys({
    author: Joi.string().required(),
    comment: Joi.string().required(),
  }),
  params: {
    id: Joi.string().uuid().required(),
  },
};

const getComments = {
  params: {
    id: Joi.string().uuid().required(),
  },
};

export { createCommentSchema, getComments };
