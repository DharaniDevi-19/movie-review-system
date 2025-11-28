import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const fetchMovies = () => API.get('/movies');
export const fetchMovieById = (id) => API.get(`/movies/${id}`);
export const addReview = (movieId, data, token) =>
  API.post(`/reviews/movie/${movieId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
