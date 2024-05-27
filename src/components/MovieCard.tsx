// MovieCard.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../features/movies/moviesSlice';
import { Movie } from '../types/types';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import firstImage from '../assets/images/dark_knight.jpg'
interface MovieCardProps {
  movieItem: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieItem }) => {
  const dispatch = useDispatch();
  const [favBtn, setFavBtn] = useState<boolean>(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favBtn) {
      dispatch(removeFavoriteMovie(movieItem.id));
    } else {
      dispatch(addFavoriteMovie(movieItem.id));
    }
    setFavBtn(!favBtn);
  };

  return (
    <div className="border w-[280px] cursor-pointer mt-3 mr-3 p-2 relative bg-[#131c31]" onClick={() => window.location.href = movieItem.imdb_url}>
      <div className='w-[260px] relative hover:opacity-50'>
        <button
          className={`absolute text-red-600 text-2xl right-1 top-1 p-1 transition-opacity duration-300 rounded-lg bg-gray-200 hover:text-red-600 ${favBtn ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleFavoriteToggle}
        >
          {favBtn ? <MdFavorite/> : <MdFavoriteBorder/>}
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
