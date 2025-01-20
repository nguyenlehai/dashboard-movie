import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Movie } from '@/types/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeDuplicateMovies = (movies: Movie[]) => {
  return movies.filter(
    (movie, index, self) =>
      index ===
      self.findIndex(
        m =>
          m.title === movie.title &&
          m.year === movie.year &&
          m.imdb_rating === movie.imdb_rating &&
          m.oscar_nominations === movie.oscar_nominations &&
          m.oscar_winning === movie.oscar_winning &&
          JSON.stringify(m.genre) === JSON.stringify(movie.genre) &&
          JSON.stringify(m.country) === JSON.stringify(movie.country) &&
          JSON.stringify(m.cast) === JSON.stringify(movie.cast) &&
          JSON.stringify(m.language) === JSON.stringify(movie.language) &&
          JSON.stringify(m.oscar_nominations_list) ===
            JSON.stringify(movie.oscar_nominations_list) &&
          JSON.stringify(m.oscar_winning_list) ===
            JSON.stringify(movie.oscar_winning_list),
      ),
  );
};
