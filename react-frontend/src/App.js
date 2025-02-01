import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

axios.defaults.withCredentials = true; // ✅ Ensure cookies are sent with requests

function App() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!formData.username || !formData.password) {
      setMessage("Please enter a username and password.");
      return;
    }

    try {
      setMessage(""); // Clear previous message
      const res = await axios.post("http://localhost:5000/signup", formData);
      setMessage(res.data.message);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error signing up.");
    }
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setMessage("Please enter a username and password.");
      return;
    }

    try {
      setMessage(""); // Clear previous message
      const res = await axios.post("http://localhost:5000/login", formData);
      console.log("Login API Response:", res.data); // Debugging

      if (res.data.user_id) {
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("username", formData.username);
        navigate("/home"); // Redirect to home
      } else {
        setMessage("Invalid credentials!");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error logging in.");
    }
  };

  return (
    <div className="container">
      <h1>Login & Signup</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
