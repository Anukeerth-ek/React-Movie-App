// moviesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../../types/types';
import { fetchMoviesFromAPI } from './moviesAPI'; // Update this path if necessary

export interface MoviesState {
  movies: Movie[];
  favoriteMovies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  favoriteMovies: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetchMoviesFromAPI();
  return response;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      const movie = state.movies.find(movie => movie.id === action.payload);
      if (movie && !state.favoriteMovies.includes(movie)) {
        state.favoriteMovies.push(movie);
      }
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
