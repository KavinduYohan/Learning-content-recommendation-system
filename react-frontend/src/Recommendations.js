import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Recommendations.css";

function Recommendations() {
  const [studentNumber, setStudentNumber] = useState("");
  const [recommendations, setRecommendations] = useState({ courses: [], videos: [] });

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_number: studentNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      } else {
        console.error("Failed to fetch recommendations");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar">
        <h1 className="navbar-logo">MyApp</h1>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>

      {/* Input Section */}
      <div className="student-input">
        <input
          type="text"
          placeholder="Enter Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <button onClick={fetchRecommendations}>Get Recommendations</button>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-container">
        <h1 className="recommendations-title">Recommendations</h1>

        {/* Courses Section */}
        <h2 className="section-title">Courses</h2>
        <div className="recommendations-row">
          {recommendations.courses.map((item, index) => (
            <div key={index} className="recommendation-card">
              <img
                src={item.thumbnail || "https://via.placeholder.com/300x180"}
                alt="Course Thumbnail"
                className="recommendation-thumbnail"
              />
              <div className="recommendation-content">
                <h2 className="recommendation-title">{item.title}</h2>
                <p className="recommendation-description">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recommendation-link"
                >
                  View Course
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Videos Section */}
        <h2 className="section-title">Videos</h2>
        <div className="recommendations-row">
          {recommendations.videos.map((item, index) => (
            <div key={index} className="recommendation-card">
              <img
                src={item.thumbnail || "https://via.placeholder.com/300x180"}
                alt="Video Thumbnail"
                className="recommendation-thumbnail"
              />
              <div className="recommendation-content">
                <h2 className="recommendation-title">{item.title}</h2>
                <p className="recommendation-description">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recommendation-link"
                >
                  View Video
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
