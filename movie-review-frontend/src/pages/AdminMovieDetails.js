import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminMovieDetails.css';

function AdminMovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovie(res.data);

        const rev = await axios.get(`http://localhost:8080/api/reviews/movie/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(rev.data);

        const likeRes = await axios.get(`http://localhost:8080/api/movies/${id}/likes?email=${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes(likeRes.data);

        const dislikeRes = await axios.get(`http://localhost:8080/api/movies/${id}/dislikes?email=${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDislikes(dislikeRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchDetails();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/movies/${id}`, movie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Movie updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="admin-movie-details">
      <h2>Edit Movie</h2>
      <form onSubmit={handleUpdate} className="edit-form">
        <input
          value={movie.title}
          name="title"
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          required
        />
        <textarea
          value={movie.description}
          name="description"
          onChange={(e) => setMovie({ ...movie, description: e.target.value })}
          required
        />
        <input
          value={movie.genre}
          name="genre"
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          required
        />
        <input
          value={movie.movieType}
          name="movieType"
          onChange={(e) => setMovie({ ...movie, movieType: e.target.value })}
          placeholder="Movie Type (e.g., Tollywood, Hollywood)"
          required
        />
        <input
          value={movie.releaseDate}
          name="releaseDate"
          onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
          required
        />
        <input
          value={movie.imageUrl}
          name="imageUrl"
          onChange={(e) => setMovie({ ...movie, imageUrl: e.target.value })}
        />

        <button type="submit">Update</button>
      </form>

      <div className="movie-feedback">
        <h3>Engagement</h3>
        <p>👍 Likes: {likes}</p>
        <p>👎 Dislikes: {dislikes}</p>
      </div>

      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, i) => (
          <div key={i} className="review-box">
            <strong>{review.email}</strong> ⭐ {review.rating}
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminMovieDetails;
