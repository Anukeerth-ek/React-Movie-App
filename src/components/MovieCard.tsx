import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../features/movies/moviesSlice';
import { Movie } from '../types/types';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { RootState } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movieItem: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movieItem }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoriteMovies = useSelector((state: RootState) => state.movies.favoriteMovies);
  const isAlreadyFavorite = favoriteMovies.some(movie => movie.id === movieItem.id);

  const [isFavorite, setIsFavorite] = useState<boolean>(isAlreadyFavorite);
  const [showFavIcon, setShowFavIcon] = useState<boolean>(false)

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavoriteMovie(movieItem.id));
    } else {
      dispatch(addFavoriteMovie(movieItem.id));
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        console.log('Reached the bottom of the page!');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="border w-[330px] md:w-[280px] cursor-pointer mt-3 md:mr-3 p-2 pb-3 relative bg-[#131c31]" onMouseEnter={()=> setShowFavIcon(true)} onMouseLeave={()=> setShowFavIcon(false)} onClick={() => navigate('/movieDetail')}>
      <div className='w-[312px] md:w-[262px] relative hover:scale-105 duration-300'>
        <button
          className={`absolute text-red-600 text-2xl right-1 top-1 p-1 transition-opacity duration-300 rounded-lg bg-gray-200 hover:text-red-600 ${isFavorite && 'opacity-100' }`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite  ? <MdFavorite /> : showFavIcon && <MdFavoriteBorder />} 
        </button>
        <img src={movieItem.thumbnail} className='w-full h-[190px] object-fill hover:bg-black rounded-md' />
      </div>
      <div className='px-[10px] md:px-[13px] mt-[8px]'>
        <div className='flex justify-between'>
          <h2 className='text-lg text-white'>{movieItem.title.length > 18 ? `${movieItem.title.slice(0, 18)}...` : movieItem.title}</h2>
          <p className='text-white'><span className='text-[#7eadfc]'>{movieItem.year}</span></p>
        </div>
        <div>
          <ul className='flex flex-wrap'>
            {movieItem?.genres?.map((item, index) => (
              <li className='bg-[#7eadfc] mr-[5px] mt-1 py-[2px] px-1 rounded-md text-white' key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
