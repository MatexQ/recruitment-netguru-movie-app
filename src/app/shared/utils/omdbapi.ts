import { URL } from 'url';
import rp from 'request-promise-native';

import { IMovie } from '@interfaces';
import { omdbapi } from '@config';

interface IGetMovieFromApi {
  [key: string]: string;
}

const lowercaseKeys = (data): IGetMovieFromApi => {
  const result = {};

  Object.entries(data).forEach(record => {
    const [key, value] = record;

    const lowercaseKey = key.toLowerCase();
    result[lowercaseKey] = value;
  });

  return result;
};

const getMovieFromApi = async (title): Promise<IGetMovieFromApi | null | IMovie>  => {
  const searchPart = `?t=${title}&apikey=${omdbapi.apiKey}&r=json`;
  const apiUri = new URL(searchPart, omdbapi.uri).toString();

  const movies = await rp.get(apiUri, omdbapi.options);

  const resultLowerCase = lowercaseKeys(movies);

  if (resultLowerCase.error) {
    return null;
  }

  return resultLowerCase;
};

export { getMovieFromApi, lowercaseKeys };
