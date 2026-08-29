import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import "./Auth.css";

axios.defaults.withCredentials = true;

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 4) {
      setErrorMessage("Password must be at least 4 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await axios.post("http://localhost:5000/signup", {
        username: formData.username.trim(),
        password: formData.password
      });

      setSuccessMessage(res.data.message || "Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setErrorMessage(
        err.response?.data?.message || "Unable to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-badge">
            <FaUserPlus />
          </div>
          <h1>Create Account</h1>
          <p>Sign up to start your personalized learning journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSignup}>
          {errorMessage && (
            <div className="auth-alert error">
              <FaExclamationCircle />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="auth-alert success">
              <FaCheckCircle />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="input-group">
            <label className="input-label" htmlFor="signup-username">
              Username or Email
            </label>
            <div className="input-wrapper">
              <FaUser className="field-icon" />
              <input
                id="signup-username"
                className="auth-input"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="signup-password">
              Password
            </label>
            <div className="input-wrapper">
              <FaLock className="field-icon" />
              <input
                id="signup-password"
                className="auth-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="signup-confirm-password">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <FaLock className="field-icon" />
              <input
                id="signup-confirm-password"
                className="auth-input"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <FaUserPlus />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
