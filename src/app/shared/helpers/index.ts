import { ISearchBy } from './interfaces';

export const existsInDB = async (model: any, searchBy: ISearchBy): Promise<boolean> => {
  const modelInstance = await model.findBy({
    field: { ...searchBy },
  });

  return !!modelInstance;
};
