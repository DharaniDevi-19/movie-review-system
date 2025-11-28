package com.aptpath.task2.entity;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate releaseDate;
    private String genre;
    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "like_count")
    private int likeCount = 0;

    @Column(name = "dislike_count")
    private int dislikeCount = 0;

    @Column(name = "movie_type")
    private String movieType;  // E.g., "Bollywood", "Tollywood", "Animated"


}
