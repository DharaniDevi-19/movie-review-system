package com.aptpath.task2.controller;

import com.aptpath.task2.entity.Movie;
import com.aptpath.task2.repository.MovieRepository;
import com.aptpath.task2.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieRepository movieRepository;
    private final MovieService movieService;

    // Reaction cache (key: movieId-email, value: LIKE or DISLIKE)
    private final Map<String, String> userReactions = new ConcurrentHashMap<>();

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'REVIEWER')")
    @GetMapping
    public ResponseEntity<List<Movie>> getAll() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.updateMovie(id, movie));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable Long id, @RequestParam String email) {
        Optional<Movie> movieOpt = movieRepository.findById(id);
        if (movieOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found");
        }

        Movie movie = movieOpt.get();
        String key = id + "-" + email;
        String previous = userReactions.get(key);

        if ("LIKE".equals(previous)) {
            movie.setLikeCount(movie.getLikeCount() - 1);
            userReactions.remove(key);
        } else {
            if ("DISLIKE".equals(previous)) {
                movie.setDislikeCount(movie.getDislikeCount() - 1);
            }
            movie.setLikeCount(movie.getLikeCount() + 1);
            userReactions.put(key, "LIKE");
        }

        movieRepository.save(movie);
        return ResponseEntity.ok(Map.of(
                "likeCount", movie.getLikeCount(),
                "dislikeCount", movie.getDislikeCount(),
                "reaction", userReactions.getOrDefault(key, "")
        ));
    }

    @PutMapping("/{id}/dislike")
    public ResponseEntity<?> toggleDislike(@PathVariable Long id, @RequestParam String email) {
        Optional<Movie> movieOpt = movieRepository.findById(id);
        if (movieOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found");
        }

        Movie movie = movieOpt.get();
        String key = id + "-" + email;
        String previous = userReactions.get(key);

        if ("DISLIKE".equals(previous)) {
            movie.setDislikeCount(movie.getDislikeCount() - 1);
            userReactions.remove(key);
        } else {
            if ("LIKE".equals(previous)) {
                movie.setLikeCount(movie.getLikeCount() - 1);
            }
            movie.setDislikeCount(movie.getDislikeCount() + 1);
            userReactions.put(key, "DISLIKE");
        }

        movieRepository.save(movie);
        return ResponseEntity.ok(Map.of(
                "likeCount", movie.getLikeCount(),
                "dislikeCount", movie.getDislikeCount(),
                "reaction", userReactions.getOrDefault(key, "")
        ));
    }

    @PutMapping("/{id}/type")
    public ResponseEntity<Movie> updateMovieType(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        movie.setMovieType(request.get("movieType"));
        movieRepository.save(movie);
        return ResponseEntity.ok(movie);
    }
   

}
