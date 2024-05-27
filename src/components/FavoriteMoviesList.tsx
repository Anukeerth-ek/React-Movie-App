// FavoriteMoviesList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/types';

const FavoriteMoviesList: React.FC = () => {
  const favoriteMovies = useSelector((state: RootState) => state.movies.favoriteMovies);

  return (
    <div>
      <h2>Favourite Movies</h2>
      <div className="grid grid-cols-3 gap-4">
        {favoriteMovies.map((movie) => (
          <div key={movie.id} className="flex flex-col items-center">
            <img src={movie.image} alt={movie.movie} className="w-full h-[190px] object-fill hover:bg-black-60" />
            <h3 className="text-lg">{movie.movie}</h3>
            <p>Rating: <span>{movie.rating}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMoviesList;
