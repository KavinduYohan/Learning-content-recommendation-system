import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaExclamationCircle } from "react-icons/fa";
import "./Auth.css";

axios.defaults.withCredentials = true;

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await axios.post("http://localhost:5000/login", formData);

      if (res.data.user_id) {
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("username", formData.username);
        navigate("/home");
      } else {
        setErrorMessage("Invalid credentials!");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setErrorMessage(
        err.response?.data?.message || "Unable to connect to server. Please try again."
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
            <FaSignInAlt />
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your credentials to access your account</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {errorMessage && (
            <div className="auth-alert error">
              <FaExclamationCircle />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="input-group">
            <label className="input-label" htmlFor="login-username">
              Username or Email
            </label>
            <div className="input-wrapper">
              <FaUser className="field-icon" />
              <input
                id="login-username"
                className="auth-input"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="login-password">
              Password
            </label>
            <div className="input-wrapper">
              <FaLock className="field-icon" />
              <input
                id="login-password"
                className="auth-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
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

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Logging In...</span>
              </>
            ) : (
              <>
                <FaSignInAlt />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
