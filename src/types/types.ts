
export interface Movie {
  
  title: string;
  year: number;
  cast: string[]
  thumbnail: string;
  imdb_url: string;
  genres:string[];
  href:string;
  extract: string;
  timestamp?: number; 
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
