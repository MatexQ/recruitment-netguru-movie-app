import { Request, Response, NextFunction } from 'express';

import { IError } from '@interfaces';
import { handleError } from './error-handler.service';

export const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  const error: IError = handleError(err);

  res.status(error.statusCode || 500).json(error);
};
