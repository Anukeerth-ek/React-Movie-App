import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../features/movies/moviesSlice';
import { Movie } from '../types/types';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { RootState } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movieItem: Movie;
}

const AllMovies = () => {
  const { movies, searchInput } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const favoriteMovies = useSelector((state: RootState) => state.movies.favoriteMovies);

  const isFavorite = (movie: Movie) => {
    return favoriteMovies.some(favMovie => favMovie.id === movie.id);
  };

  const handleFavoriteToggle = (item: Movie) => {
    if (isFavorite(item)) {
      dispatch(removeFavoriteMovie(item.id));
    } else {
      dispatch(addFavoriteMovie(item));
    }
  };

  return (
    <div className='flex flex-wrap mx-auto justify-center'>
      {filteredMovies.map((item, index) => (
        <div key={index} className="border w-[330px] md:w-[280px] cursor-pointer mt-3 md:mr-3 p-2 pb-3 relative bg-[#131c31]">
          <div className='w-[312px] md:w-[262px] relative hover:scale-105 duration-300'>
            <button
              className={`absolute text-red-600 text-2xl right-1 top-1 p-1 transition-opacity duration-300 rounded-lg bg-gray-200 hover:text-red-600 `}
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle(item);
              }}
            >
              {isFavorite(item) ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            <img src={item.thumbnail} className='w-full h-[190px] object-fill hover:bg-black rounded-md' alt={item.title} />
          </div>
          <div className='px-[10px] md:px-[13px] mt-[8px]'>
            <div className='flex justify-between'>
              <h2 className='text-lg text-white'>{item.title.length > 18 ? `${item.title.slice(0, 18)}...` : item.title}</h2>
              <p className='text-white'><span className='text-[#7eadfc]'>{item.year}</span></p>
            </div>
            <div>
              <ul className='flex flex-wrap'>
                {item.genres.map((genre, idx) => (
                  <li className='bg-[#7eadfc] mr-[5px] mt-1 py-[2px] px-1 rounded-md text-white' key={idx}>
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  
  );
};

export default AllMovies;
