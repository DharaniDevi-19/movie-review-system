import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);

    // 👇 Fetch user info to get role
    const userRes = await axios.get('http://localhost:8080/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });




    const role = userRes.data.role;
    console.log('Logged in as:', role);

    // 👇 Store role if needed
    localStorage.setItem('role', role);

    // ✅ Redirect based on role
    if (role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/movies');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Invalid email or password.');
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
