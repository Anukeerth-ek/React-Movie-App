// types.ts
export interface Movie {
  id: string | number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
}

export interface RootState {
  movies: MoviesState;
}

export interface MoviesState {
  movies: Movie[];
  favoriteMovies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
