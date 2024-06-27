import axios from 'axios';

const apiUrl = '../movieBackend/api/movieApi.json';

export const fetchMoviesFromAPI = async () => {
  try {
    const response = await axios.get(apiUrl);
    const movies = response.data;

    // Add unique ID to each movie
    const moviesWithIds = movies.map((movie:any, index:number) => ({
      id: index + 1,
      ...movie
    }));

 
    return moviesWithIds;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
