import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyles.css';

// Defining the interface for login form data
interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      setError('All fields are required.');
      return;
    }

    setError(null); // Clear any previous errors

    // Perform login logic here (e.g., API call)
    console.log('Login attempt:', formData);

    // Reset form (optional)
    setFormData({
      username: '',
      password: '',
    });
  };

  const handleRegisterClick = () => {
    navigate('../../components/RegisterForm/RegisterForm.tsx'); // Navigate to the registration page
  };

  return (
    <div className="login">
      <h1 className="h1">Epic Workout Battles</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="input"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <input
            type="button"
            id="register"
            className="btn btn-secondary"
            value="Register"
            onClick={handleRegisterClick}  // Replace with navigation logic
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
