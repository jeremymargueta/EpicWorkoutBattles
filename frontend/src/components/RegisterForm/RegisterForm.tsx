import React, { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
} from "../../utils/validation";
import { registerUser } from "../../services/RegisterService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import zxcvbn from "zxcvbn";
import "./RegisterFormStyle.css";

// Stating Attributes
interface RegisterFormData {
  username: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirm_password: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const strength = zxcvbn(password);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(e.target.value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.username ||
      !formData.fname ||
      !formData.lname ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required.");
      return;
    }

    if (!validateUsername(formData.username)) {
      setError("Invalid Username");
      return;
    }

    if (!validateName(formData.fname)) {
      setError("Invalid First name");
      return;
    }

    if (!validateName(formData.lname)) {
      setError("Invalid Last name");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email address.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const lower_letter_check = /[a-z]/;
    const upper_letter_check = /[A-Z]/;
    const number_check = /[0-9]/;

    if (
      !lower_letter_check.test(formData.password) ||
      !upper_letter_check.test(formData.password) ||
      !number_check.test(formData.password)
    ) {
      setError(
        "Password must container an upper case letter, lower case letter, and a number"
      );
      return;
      //password_error.innerHTML = "Password must contain at least one letter and one number";
    }

    if (formData.confirm_password === "" || formData.confirm_password == null) {
      setError("Confirm Password required");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log(formData);
      const response = await registerUser(formData);
    } catch (error) {
      console.log("Error Registering");
    }
  };

  const handleLoginClick = () => {
    navigate("/"); // Navigate to the Login Page
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        {/* User Name Field */}
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        {/* First Name Field */}
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="form-control"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name Field */}
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            className="form-control"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a strong password"
            required
          />
          <p> Strength: {strength.score} / 4</p>
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="form-control"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
        <input
          type="button"
          id="login"
          className="btn btn-secondary"
          value="Login"
          onClick={handleLoginClick} // Replace with navigation logic
        />
      </form>
    </div>
  );
};

export default RegisterForm;
