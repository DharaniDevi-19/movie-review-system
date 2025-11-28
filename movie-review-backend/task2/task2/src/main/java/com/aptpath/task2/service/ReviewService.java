package com.aptpath.task2.service;

import com.aptpath.task2.entity.Movie;
import com.aptpath.task2.entity.Review;
import com.aptpath.task2.entity.User;
import com.aptpath.task2.repository.MovieRepository;
import com.aptpath.task2.repository.ReviewRepository;
import com.aptpath.task2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    // ✅ Updated method name and logic
    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    public Review addReview(Long userId, Long movieId, Review review) {
        User user = userRepository.findById(userId).orElseThrow();
        Movie movie = movieRepository.findById(movieId).orElseThrow();

        review.setUser(user);
        review.setMovie(movie);

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByMovie(Long movieId) {
        return reviewRepository.findByMovieId(movieId);
    }
    public Review updateReview(Long userId, Long reviewId, Review updatedReview) {
        Review existing = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!existing.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to update this review");
        }

        existing.setComment(updatedReview.getComment());
        existing.setRating(updatedReview.getRating());
        return reviewRepository.save(existing);
    }

}
