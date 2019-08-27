export interface IComment {
  id: string;
  comment: string;
  author: string;
  movieId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateComment {
  author: string;
  comment: string;
}
