import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieTypes, setMovieTypes] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view movies.');
      return;
    }

    const fetchData = async () => {
      try {
        const moviesRes = await axios.get('http://localhost:8080/api/movies', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const allMovies = moviesRes.data;

        setMovies(allMovies);
        setFilteredMovies(allMovies);

        // Extract unique genres from all movies (optional if genre API doesn't exist)
        const allGenres = Array.from(new Set(
          allMovies.flatMap(movie =>
            movie.genre ? movie.genre.split(',').map(g => g.trim()) : []
          )
        ));
        setGenres(allGenres);

        // Extract unique movie types from all movies
        const types = Array.from(new Set(allMovies.map(movie => movie.movieType)));
        setMovieTypes(types);

        // Trending movies (rating between 4 and 5)
        const trending = allMovies.filter(m => m.rating >= 4 && m.rating <= 5);
        setTrendingMovies(trending);

      } catch (err) {
        console.error(err);
        setError('Failed to fetch movies. Please login again.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        selectedGenres.every(g =>
          movie.genre?.toLowerCase().includes(g.toLowerCase())
        )
      );
    }

    if (selectedType) {
      filtered = filtered.filter(movie => movie.movieType === selectedType);
    }

    setFilteredMovies(filtered);
  }, [selectedGenres, selectedType, movies]);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleType = (type) => {
    setSelectedType(prev => (prev === type ? '' : type));
  };

  return (
    <div className="movies-container">
      <h2>🔥 Trending Movies</h2>
      <div className="trending-movie-row">
        {trendingMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h2>🎥 All Movies</h2>
      {error && <p className="error">{error}</p>}

      <div className="filter-bar">
        <div className="filter-section">
          <h4>Genres:</h4>
          <div className="filter-buttons">
            {genres.map((genre, idx) => (
              <button
                key={idx}
                className={`filter-btn ${selectedGenres.includes(genre) ? 'active' : ''}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Movie Type:</h4>
          <div className="filter-buttons">
            {movieTypes.map((type, idx) => (
              <button
                key={idx}
                className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => toggleType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
