
import axios from 'axios';

const apiUrl = 'https://dummyapi.online/api/movies';

export const fetchMoviesFromAPI = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
