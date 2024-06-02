import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/types";

const FavoriteMoviesList: React.FC = () => {
     const favoriteMovies = useSelector((state: RootState) => state.movies.favoriteMovies);

     // Sort favoriteMovies array based on the timestamp property
     const sortedFavoriteMovies = favoriteMovies.slice().sort((a, b) => {
          const timestampA = a.timestamp !== undefined ? a.timestamp : Number.MIN_SAFE_INTEGER;
          const timestampB = b.timestamp !== undefined ? b.timestamp : Number.MIN_SAFE_INTEGER;
          return timestampB - timestampA;
     });

     return (
          <div className="px-10 pt-4">
               {sortedFavoriteMovies.length === 0 ? (
                    <div className="text-gray-500">
                         No favorite movies added yet. Add some movies to your favorites list!
                    </div>
               ) : (
                    <>
                         <h2 className="text-2xl">Favourite Movies</h2>
                         <div className=" flex flex-col md:flex-row ">
                              {sortedFavoriteMovies.map((movie, index) => (
                                   <div
                                        key={index}
                                        className="flex flex-col items-center w-[280px]  border   cursor-pointer mt-3 mr-3 p-2 bg-[#131c31]"
                                   >
                                        <img src={movie.thumbnail} className="w-full h-[190px] object-fill hover:bg-black-60" />
                                        <div className="flex justify-between items-center ">
                                             <h3 className="text-lg mr-4 text-white">{movie.title}</h3>

                                             <p className="text-white">
                                                  {/* Rating: <span className="text-[#7eadfc]">{movie.rating}</span> */}
                                             </p>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </>
               )}
          </div>
     );
};

export default FavoriteMoviesList;
