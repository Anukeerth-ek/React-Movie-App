

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../../types/types';
import { fetchMoviesFromAPI } from './moviesAPI';

interface FavoriteMovie extends Movie {
  timestamp: number;
}

export interface MoviesState {
  movies: Movie[];
  favoriteMovies: FavoriteMovie[];
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
      if (movie && !state.favoriteMovies.some(favMovie => favMovie.id === movie.id)) {
        // Add timestamp property to the movie before adding to favorites
        const movieWithTimestamp = { ...movie, timestamp: Date.now() };
        state.favoriteMovies.push(movieWithTimestamp);
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
