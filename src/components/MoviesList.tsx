import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movies/moviesSlice';
import MovieCard from './MovieCard';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RootState } from '../types/types';
import {AppDispatch } from '../features/store';


const MoviesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, error, searchInput} = useSelector((state: RootState) => state.movies);

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

  // const filteredMovies = movies.filter(movie =>
  //   movie.title.toLowerCase().includes(searchInput.toLowerCase())
  // );


  return (
    <div className='px-[16px] md:px-[90px] lg:px-[175px] py-5 w-[100%] '>
      <div className='flex justify-between mx-5 md:mx-0'>
        <h2 className='text-2xl font-semibold'>All Movies</h2>
        <IoMdArrowDropdownCircle className='text-2xl hover:translate-y-2 duration-300' />
      </div>
      <div className='flex items-center justify-center flex-wrap'>
        {movies.slice(0, 24).map((movieItem, index) => (
          <>
          <MovieCard key={index} movieItem={movieItem} />
         
          </>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
