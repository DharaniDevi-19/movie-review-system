🎬 Movie Review System – Spring Boot & MySQL

A full-featured backend application built using Spring Boot that manages users, movies, reviews, ratings, comments, likes, and recommendations.
The system supports both regular users and administrators, providing secure authentication, content moderation, and insights such as trending and top-rated movies.

✨ Key Features
🔐 User Management & Authentication

User registration and login with role-based access (Admin, User, Reviewer)

Secure JWT-based authentication

Endpoint to fetch the authenticated user’s profile

🎬 Movie Management (Admin)

Add, update, and delete movies

Retrieve movie details by ID

Fetch a complete list of movies

⭐ Reviews & Ratings

Users and reviewers can post, edit, and delete their reviews

Support for ratings on a 1–5 scale

Admin access to all reviews for oversight

💬 Comments & Likes

Comment threads with support for nested replies (parent_id)

Like/Unlike system for reviews

📈 Trending & Top Rated

Trending movies calculated using recent engagement (likes, reviews)

Top-rated movies based on aggregated rating scores

🔍 Search & Personalized Recommendations

Search movies by title, genre, or release year

Recommendation engine based on user interests and review history

🛠️ Tech Stack
Layer	Technology
Backend	Spring Boot
Security	Spring Security + JWT
Database	MySQL
ORM	Spring Data JPA
Utilities	Lombok, Validation, DevTools
API Test	Postman / Swagger
⚙️ Project Setup
1. Clone the Repository
git clone https://github.com/yourusername/movie-review-system.git
cd movie-review-system

2. Configure MySQL Database

Create the database:

CREATE DATABASE moviereviewdb;


Set credentials in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/moviereviewdb
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

3. Run the Application
mvn spring-boot:run

🗂️ Database Schema (Overview)
Users

id

name

email

password

role (ADMIN / USER / REVIEWER)

Movies

id

title

genre

description

releaseDate

imageUrl

bannerUrl

Reviews

id

user_id

movie_id

rating

content

timestamp

Comments

id

review_id

user_id

content

parent_id

Likes

id

review_id

user_id

📌 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and obtain JWT
GET	/api/users/me	Get current authenticated user
🎬 Movies (Admin)
Method	Endpoint	Description
POST	/api/movies	Add movie
PUT	/api/movies/{id}	Update movie
DELETE	/api/movies/{id}	Delete movie
GET	/api/movies	List all movies
GET	/api/movies/{id}	Get movie details
⭐ Reviews
Method	Endpoint	Description
POST	/api/reviews/movie/{id}	Add review
GET	/api/reviews/movie/{id}	Get reviews for a movie
PUT	/api/reviews/{id}	Update review
DELETE	/api/reviews/{id}	Delete review
💬 Comments & Likes
Method	Endpoint	Description
POST	/api/comments/review/{id}	Add comment
GET	/api/comments/review/{id}	Get comments
POST	/api/likes/review/{id}	Like review
DELETE	/api/likes/review/{id}	Unlike review
📈 Insights
Method	Endpoint	Description
GET	/api/movies/top-rated	Get top-rated movies
GET	/api/movies/trending	Get trending movies
🔍 Search & Recommendations
Method	Endpoint	Description
GET	/api/movies/search?query=action	Search movies
GET	/api/movies/recommendations	Personalized recommendations
📦 Week-wise Deliverables
✅ Week 1

User registration & authentication

Movie CRUD operations

Review & rating system

Postman API testing

✅ Week 2

Comment and like modules

Trending & top-rated features

Search capability

Recommendation logic

📝 Best Practices

DTO-based request/response structure

Validation for all user inputs

Role-based security rules

Structured layered architecture (Controller → Service → Repository)

Clean commit history with feature-wise segregation

Optional Swagger documentation

🤝 Contributing

Contributions are welcome.
Please follow clean code practices and add documentation for any newly introduced features or modules.

📜 License

This project is released under the MIT License.
