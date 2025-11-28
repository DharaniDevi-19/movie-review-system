package com.aptpath.task2.controller;

import com.aptpath.task2.entity.Review;
import com.aptpath.task2.service.ReviewService;
import com.aptpath.task2.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtUtil jwtUtil;

    @PreAuthorize("hasRole('REVIEWER')")
    @PostMapping("/movie/{movieId}")
    public ResponseEntity<Review> addReview(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long movieId,
            @RequestBody Review review) {

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);  // ✅ extract email
        Long userId = reviewService.getUserIdByEmail(email); // ✅ call correct method

        return ResponseEntity.ok(reviewService.addReview(userId, movieId, review));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'REVIEWER')")
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Review>> getByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getReviewsByMovie(movieId));
    }

    @PreAuthorize("hasRole('REVIEWER')")
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long reviewId,
            @RequestBody Review updatedReview) {

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);  // extract email
        Long userId = reviewService.getUserIdByEmail(email); // get logged-in user

        return ResponseEntity.ok(reviewService.updateReview(userId, reviewId, updatedReview));
    }

}
