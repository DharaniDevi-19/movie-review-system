import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    imageUrl: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/movies', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMovies(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/movies', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', description: '', genre: '', releaseDate: '', imageUrl: '' });
      fetchMovies();
    } catch (error) {
      console.error('Add movie error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMovies();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/movies/${id}`); // Route to AdminMovieDetails
  };

  return (
    <div className="admin-container">
      <h2>🎬 Admin Movie Dashboard</h2>

      <form onSubmit={handleAddMovie} className="movie-form">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />
        <input name="movieType" placeholder="Movie Industry" value={formData.movieType} onChange={handleChange} required />
        <input name="releaseDate" placeholder="Release Date (yyyy-mm-dd)" value={formData.releaseDate} onChange={handleChange} required />
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        <button type="submit">➕ Add Movie</button>
      </form>

      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="admin-movie-card">
            <img 
              src={movie.imageUrl || 'https://via.placeholder.com/150x220?text=No+Image'} 
              alt={movie.title} 
              onClick={() => handleEdit(movie.id)}
              style={{ cursor: 'pointer' }}
            />
            <div>
              <h4>{movie.title}</h4>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <button onClick={() => handleDelete(movie.id)} className="delete-btn">🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
