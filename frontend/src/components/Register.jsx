import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate('/login'); 
        } else {
          setError(data.message || 'Registration failed.');
        }
      })
      .catch(() => setError('Something went wrong. Please try again later.'));
  };

  

  const handleGoogleSignIn = async () => {
    try {
      window.location.href = "http://localhost:5000/auth/google";
      const response = await fetch("http://localhost:5000/auth/login/success", {
        credentials: "include", 
      });
  
      if (!response.ok) {
        throw new Error("Not authenticated");
      }
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.name);
  
        window.location.href = "/";
      } else {
        throw new Error(data.message || "Google Sign-In failed.");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
      alert("please signin again");
    }
  };
  
  return (
    <div className="box1   d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg" style={{ width: '30rem', padding: '20px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Register</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <hr className="my-4" />
          <button
            type="button"
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            onClick={handleGoogleSignIn}
          >
            <i className="bi bi-google me-2"><FcGoogle /></i> Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};  

export default Register;
