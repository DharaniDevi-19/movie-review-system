import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import './styles/global.css';
import MovieDetails from './pages/MovieDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminMovieDetails from './pages/AdminMovieDetails';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/movies/:id" element={<AdminMovieDetails />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
