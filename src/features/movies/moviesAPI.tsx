
import axios from 'axios';


const apiUrl = '../movieBackend/api/movieApi.json';

export const fetchMoviesFromAPI = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
