import { IMovie, IComment } from '@interfaces';

interface IField {
  [key: string]: any;
}

export interface IFindAll {
  include?: any;
  where?: any;
  order?: any;
}

export interface IFindBy {
  include?: any;
  query?: any;
  field: IField;
}

interface IBasicDal<T> {
  findAll: (data?: IFindAll) => Promise<T[]>;
  create: (data?: any) => Promise<T>;
  findByPk: (id: string) => Promise<T | any>;
  findBy: (data: IFindBy) => Promise<T>;
}

export interface IDal {
  movie: IBasicDal<IMovie>;
  comment: IBasicDal<IComment | any>;
}
