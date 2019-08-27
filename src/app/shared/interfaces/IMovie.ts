export interface IMovie {
  id: string;
  title: string;
  year: number;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  poster: string;
  metascore: string;
}

export interface ICreateMovie {
  title: string;
}
