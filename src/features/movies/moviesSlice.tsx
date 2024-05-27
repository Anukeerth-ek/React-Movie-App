import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMoviesFromAPI } from './moviesAPI';

interface Movie {
  id: string | number;
  movie: string;
  image: string;
  rating: number;
  imdb_url: string;
}

interface MoviesState {
  movies: Movie[];
  favoriteMovies: Movie[]; // Store entire movie objects
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  favoriteMovies: [],
  status: 'idle',
  error: null,
};

// Define async thunk for fetching movies
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const data = await fetchMoviesFromAPI();
  return data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies.push(action.payload); // Push entire movie object
    },
    removeFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== action.payload.id); // Remove by ID
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.movies = action.payload.sort((a, b) => b.rating - a.rating);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export const { addFavoriteMovie, removeFavoriteMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
