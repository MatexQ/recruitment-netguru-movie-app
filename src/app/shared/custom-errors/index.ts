/* tslint:disable: max-classes-per-file*/

abstract class OperationalError extends Error {
  public isOperational = true;
}

export class UnprocessableEntityError extends OperationalError {
  public name = 'Unprocessable Entity';
  public statusCode = 422;

  constructor(public message: string) {
    super();
  }
}

export class BadRequestError extends OperationalError {
  public name = 'Invalid request';
  public statusCode = 400;

  constructor(public message: string) {
    super();
  }
}

export class NotFoundError extends OperationalError {
  public name = 'Not found';
  public statusCode = 404;

  constructor(public message: string) {
    super();
  }
}
