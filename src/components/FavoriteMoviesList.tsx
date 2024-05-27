import { useSelector } from 'react-redux';
import { RootState } from '../types/types';
const FavoriteMoviesList = () => {
  // Use useSelector hook to access favoriteMovies from the Redux store
  const favoriteMovies = useSelector((state: RootState) => state.movies.favoriteMovies);
 console.log("fav is here", favoriteMovies)
  return (
    <div>
      <h2>Favourite Movies</h2>
      <div className="grid grid-cols-3 gap-4">
        {favoriteMovies.map((movie) => {
          console.log("movie", movie)
          return(
            <div key={movie.id} className="flex flex-col items-center">
            <img src={movie.image} alt={movie.movie} className="w-full h-[190px] object-fill hover:bg-black-60" />
            <h3 className="text-lg">{movie.movie}</h3>
            <p>Rating: <span>{movie.rating}</span></p>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default FavoriteMoviesList;
