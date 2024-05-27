import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../features/movies/moviesSlice';
import { Movie } from '../types/types';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import firstImage from '../assets/images/dark_knight.jpg';
import { RootState } from '../types/types';

interface MovieCardProps {
  movieItem: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieItem }) => {
  const dispatch = useDispatch();

  // Check if the movie is already in the favorites
  const favoriteMovies = useSelector((state: RootState) => state.movies.favoriteMovies);
  const isAlreadyFavorite = favoriteMovies.some(movie => movie.id === movieItem.id);

  const [isFavorite, setIsFavorite] = useState<boolean>(isAlreadyFavorite);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavoriteMovie(movieItem.id));
    } else {
      dispatch(addFavoriteMovie(movieItem.id));
    }
    setIsFavorite(!isFavorite);
  };

  // Detect when the user has scrolled to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // Load more movies here
        console.log('Reached the bottom of the page!');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="border w-[280px] cursor-pointer mt-3 mr-3 p-2 relative bg-[#131c31]" onClick={() => window.location.href = movieItem.imdb_url}>
      <div className='w-[260px] relative hover:opacity-50'>
        <button
          className={`absolute text-red-600 text-2xl right-1 top-1 p-1 transition-opacity duration-300 rounded-lg bg-gray-200 hover:text-red-600 ${isFavorite ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? <MdFavorite/> : <MdFavoriteBorder/>}
        </button>
        <img src={firstImage} alt={movieItem.movie} className='w-full h-[190px] object-fill hover:bg-black-60' />
      </div>
      <div className='px-[10px] md:px-[13px] mt-[8px]'>
        <div className='flex justify-between'>
          <h2 className=' text-lg text-white'>{movieItem.movie.length > 18 ? `${movieItem.movie.slice(0, 18)}...` : movieItem.movie}</h2>
          <p className='text-white'>Rating: <span className='text-[#7eadfc]'>{movieItem.rating}</span></p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
