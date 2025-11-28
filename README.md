# 🍿 Movie Review System - README Content

## ✨ Project Goals

* *Role-Based Access*: Enable user registration, login, and role-based access (Admin, User, Reviewer).
* *Reviews & Ratings*: Allow users to submit reviews and ratings.
* *Admin Management*: Allow Admins to manage movies, users, and reviews.
* *Discovery*: Implement trending, top-rated movies, and personalized recommendations.
* *Engagement*: Include a commenting and like system.

## 🛠 Technology Stack

* Backend: *Spring Boot*
* Database: *MySQL*
* Data Access: *Spring Data JPA*
* Security: *Spring Security* (for role-based protection)
* Utilities: *Lombok, **Validation*
* Testing: *Postman, **Swagger UI* (Optional)

## 🧩 Modules and Features

### 1. User Management & Authentication

* *Table*: users (id, name, email, password, role)
* *Endpoints*:
    * POST /api/auth/register (Register)
    * POST /api/auth/login (Login, get JWT token)
    * GET /api/users/me (Get current user profile)

### 2. Movie Management (Admin)

* *Table*: movies (id, title, genre, description, releaseDate)
* *Endpoints*:
    * POST /api/movies (Add movie - *Admin only*)
    * PUT /api/movies/{id} (Update movie - *Admin only*)
    * DELETE /api/movies/{id} (Delete movie - *Admin only*)
    * GET /api/movies (List movies)
    * GET /api/movies/{id} (Get movie by ID)

### 3. Review Submission System

* *Table*: reviews (id, user\_id, movie\_id, rating, content, timestamp)
* *Endpoints*:
    * POST /api/reviews/movie/{id} (Add review)
    * GET /api/reviews/movie/{id} (View reviews for a movie)
    * PUT /api/reviews/{id} (Update review)
    * DELETE /api/reviews/{id} (Delete review)

### 4. Comment & Like System

* *Tables*:
    * comments (id, review\_id, user\_id, content, parent\_id)
    * likes (id, review\_id, user\_id)
* *Endpoints*:
    * POST /api/comments/review/{id} (Add comment)
    * GET /api/comments/review/{id} (View comments)
    * POST /api/likes/review/{id} (Like a review)
    * DELETE /api/likes/review/{id} (Unlike a review)

### 5. Trending & Recommendations

* *Trending Logic*: Sort by recent reviews and likes.
* *Top-Rated Logic*: Sort by average ratings.
* *Endpoints*:
    * GET /api/movies/top-rated (Get top-rated movies)
    * GET /api/movies/trending (Get trending movies)
    * GET /api/movies/search?query=... (Search by title/genre/release year)
    * GET /api/movies/recommendations (Personalized recommendations)

## 💡 Final Notes for Interns

* Use *DTOs* for clean request/response handling.
* Apply *Validation* annotations for input fields.
* Use *Spring Security* for *role-based protection*.
* *Test every module* with Postman.
* Use *Git* for version control and clean commits.
* (Optional) Use *Swagger UI* for documentation.


## 🎥 Project Demo Video  
Click below to watch the full demonstration of the Movie Review System:

➡️ [Watch Demo Video](https://drive.google.com/file/d/136mI5VoKt-Vsz0zPCWVWzZPiuWI2BN83/view?usp=drive_link)
