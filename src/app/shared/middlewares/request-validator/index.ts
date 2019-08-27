import { isCelebrate } from 'celebrate';

const requestValidate = (err, req, res, next) => {
  const errorExists = isCelebrate(err);
  if (!errorExists) {
    next();
  }

  throw err;
};

export { requestValidate };
