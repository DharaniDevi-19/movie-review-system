import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'; // Make sure this file exists and styles the card

function MovieCard({ movie }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card movie-card text-center shadow-sm">
        <Link to={`/movies/${movie.id}`}>
          <img
            src={movie.imageUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
            className="card-img-top movie-poster"
            alt={movie.title}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text"><strong>Genre:</strong> {movie.genre || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
