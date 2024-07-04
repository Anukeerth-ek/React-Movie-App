import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie } from '../../types/types';

interface FavoriteMovie extends Movie {
  timestamp: number;
}

export interface MoviesState {
  movies: Movie[];
  favoriteMovies: FavoriteMovie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchInput: string;
}

const initialState: MoviesState = {
  movies: [],
  favoriteMovies: [],
  status: 'idle',
  error: null,
  searchInput: '',
};

const apiUrl = '../movieBackend/api/movieApi.json';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(apiUrl);
  const movies = response.data;
  const moviesWithIds = movies.map((movie: any, index: number) => ({
    id: index + 1,
    ...movie
  }));
  return moviesWithIds;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload.trim().toLowerCase();
    },
    addFavoriteMovie: (state, action) => {
      const movie = state.movies.find(movie => movie.id === action.payload);
      if (movie && !state.favoriteMovies.some(favMovie => favMovie.id === movie.id)) {
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
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const { setSearchInput, addFavoriteMovie, removeFavoriteMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
