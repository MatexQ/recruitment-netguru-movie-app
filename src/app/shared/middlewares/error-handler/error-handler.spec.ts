import { logger } from '@utils';
import { handleError } from './error-handler.service';
import { IError } from '@interfaces';
import { BadRequestError, UnprocessableEntityError } from '@customErrors';

describe('ERROR HANDLER MIDDLEWARE', () => {
  const loggerMoc: any = jest.spyOn(logger, 'error');
  loggerMoc.mockReturnValue('');

  beforeEach(() => {
    loggerMoc.mockReset();
  });

  it('shoulr return BadRequestError', () => {
    const myError: IError = new Error('test');
    myError.status = true;

    const error = handleError(myError);
    expect(error).toEqual(new BadRequestError('test'));
    expect(loggerMoc).toBeCalledTimes(1);
  });

  it('should return UnprocessableEntityError', () => {
    const myError: IError = new Error();
    myError.name = 'SequelizeValidationError';
    myError.errors = [{ message: 'test ' }, { message: 'test' }];

    const error = handleError(myError);
    expect(error).toEqual(new UnprocessableEntityError('test , test'));
    expect(loggerMoc).toBeCalledTimes(1);
  });
});
