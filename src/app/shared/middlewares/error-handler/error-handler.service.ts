import { ValidationError } from 'sequelize';

import { logger } from '@utils';
import { BadRequestError, UnprocessableEntityError } from '@customErrors';
import { IError } from '@interfaces';
import { isCelebrate } from 'celebrate';

const handleError = (error: IError): IError => {
  const customError = getCustomError(error);
  logger.error(customError.message || customError.name);

  return customError;
};

const getCustomError = (error: IError): IError => {
  const sequelizeError = isSequelizeValidationError(error);
  const isRequestError = isRequestValidateError(error);
  const bodyParserError = isBodyParserError(error);

  if (sequelizeError) {
    const errorMsg = getSequelizeValidationErrorMessage(error as ValidationError);
    return new UnprocessableEntityError(errorMsg);
  }

  if (isRequestError) {
    const badRequestError = new BadRequestError(error.message);
    return {
      ...badRequestError,
      details: error.joi.details,
    };
  }

  if (bodyParserError) {
    return new BadRequestError(error.message);
  }

  return error;
};

const isRequestValidateError = (error: IError) => isCelebrate(error);

const isSequelizeValidationError = (error: IError) => /sequelize/gi.test(error.name);

const isBodyParserError = (error: IError) => error.status ? true : false;

const getSequelizeValidationErrorMessage = (error: ValidationError) => {
  if (!error.errors) {
    return error;
  }

  return error.errors.map(currentError => currentError.message).join(', ');
};

export { handleError };
