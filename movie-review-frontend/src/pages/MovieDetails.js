import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // 'like', 'dislike', or null

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('🔐 You must be logged in to view movie details.');
      return;
    }

    // Fetch movie details
    axios.get(`http://localhost:8080/api/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const data = res.data;
        setMovie(data);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setUserReaction(data.userReaction); // assuming backend returns this field
      })
      .catch(err => {
        console.error('❌ Movie details fetch error:', err);
        setError('Failed to load movie details.');
      });

    // Fetch reviews
    axios.get(`http://localhost:8080/api/reviews/movie/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setReviews(res.data))
      .catch(err => console.error('❌ Reviews fetch error:', err));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(`http://localhost:8080/api/reviews/movie/${id}`, {
        rating,
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRating('');
      setComment('');

      const res = await axios.get(`http://localhost:8080/api/reviews/movie/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(res.data);
    } catch (err) {
      console.error('❌ Review submit error:', err);
    }
  };

  const handleReaction = async (type) => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  try {
    const res = await axios.put(
      `http://localhost:8080/api/movies/${id}/${type}?email=${email}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setLikes(res.data.likeCount);
    setDislikes(res.data.dislikeCount);
    // Optionally show reaction feedback
  } catch (err) {
    console.error(`❌ ${type} update failed`, err);
  }
};


  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details-container">
      <div className="poster-details-wrapper">
        <div className="poster-container">
          <img
            src={movie.imageUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
            alt={movie.title}
            className="movie-poster"
          />
        </div>

        <div className="details-container">
          <h2>{movie.title}</h2>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Type:</strong> {movie.movieType}</p>

          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p className="description">{movie.description}</p>

          <div className="like-dislike-container">
            <button onClick={() => handleReaction('like')} className="like-button">👍 {likes}</button>
            <button onClick={() => handleReaction('dislike')} className="dislike-button">👎 {dislikes}</button>

          </div>
        </div>
      </div>

      <form onSubmit={handleReviewSubmit} className="review-form">
        <h4>Add Your Review</h4>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          rows="3"
          required
        />
        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-section">
        <h4>Reviews</h4>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p><strong>{review.user?.email || 'Anonymous'}:</strong> ⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
