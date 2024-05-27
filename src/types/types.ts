// types.ts

// Define the Movie interface
export interface Movie {
  id: string | number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
}

// Define the RootState interface representing the overall state of the Redux store
export interface RootState {
  movies: MoviesState;
  // Add other slices of the store if needed
}

// Define the shape of the movies slice of the Redux store
export interface MoviesState {
  favoriteMovies: Movie[];
  // Add other movie-related properties if needed
}
