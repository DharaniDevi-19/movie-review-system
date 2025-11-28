package com.aptpath.task2.service;

import com.aptpath.task2.entity.Movie;
import com.aptpath.task2.repository.MovieRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final Map<String, String> userReactions = new ConcurrentHashMap<>();
// Key: movieId + "-" + userEmail | Value: "LIKE" or "DISLIKE"


    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie updateMovie(Long id, Movie updatedMovie) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        movie.setTitle(updatedMovie.getTitle());
        movie.setDescription(updatedMovie.getDescription());
        movie.setReleaseDate(updatedMovie.getReleaseDate());
        return movieRepository.save(movie);
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
