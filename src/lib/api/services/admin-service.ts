import { endpoints } from '../endpoints';
import { api } from '@/lib/api/axios';
import type { Movie, MovieListResponse } from '@/types/api';

export const adminService = {
  getListMovie: async (): Promise<MovieListResponse> => {
    const response = await api.get<{ movies: Movie[] }>(endpoints.movies.list);

    // Map response data to match our interface
    return {
      data: response.data.movies.map(movie => ({
        ...movie,
        rating: movie.imdb_rating,
        nominations: movie.oscar_nominations,
        wins: movie.oscar_winning,
      })),
      total: response.data.movies.length,
    };
  },
};
