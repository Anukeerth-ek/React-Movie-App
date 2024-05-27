import axios from 'axios';

const apiUrl = 'https://dummyapi.online/api/movies';
console.log('API URL:', apiUrl); // Add this line for debugging

export const fetchMoviesFromAPI = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
