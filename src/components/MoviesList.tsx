import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchMovies } from '../features/movies/moviesSlice';
import MovieCard from './MovieCard';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RootState } from '../types/types';

const MoviesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies, status, error } = useAppSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='px-[10px] md:px-[175px] py-5 w-[100%] '>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-semibold'>All Movies</h2>
        <IoMdArrowDropdownCircle className='text-2xl hover:translate-y-2 duration-300'/>
      </div>
      <div className='flex flex-wrap'>
        {movies.map((movieItem) => (
          <MovieCard key={movieItem.id} movieItem={movieItem} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
