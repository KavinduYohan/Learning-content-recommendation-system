import React from "react";
import { Link } from "react-router-dom";
import "./Recommendations.css";

function Recommendations() {
  // Dynamic data for recommendations
  const recommendations = [
    {
      type: "Course",
      title: "Introduction to React",
      description: "Learn the basics of React, including components and hooks.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/react",
    },
    {
      type: "Video",
      title: "Understanding React State",
      description: "A detailed explanation of how state works in React.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/video/state",
    },
    {
      type: "Article",
      title: "Top React Best Practices",
      description: "Enhance your React code quality with these tips.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/article/practices",
    },
    {
      type: "Course",
      title: "Advanced JavaScript",
      description: "Master the advanced concepts of JavaScript with this course.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/javascript",
    },
    {
      type: "Course",
      title: "Advanced JavaScript",
      description: "Master the advanced concepts of JavaScript with this course.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/javascript",
    },
    {
      type: "Course",
      title: "Advanced JavaScript",
      description: "Master the advanced concepts of JavaScript with this course.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/javascript",
    },
    {
      type: "Course",
      title: "Advanced JavaScript",
      description: "Master the advanced concepts of JavaScript with this course.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/javascript",
    },
    {
      type: "Course",
      title: "Advanced JavaScript",
      description: "Master the advanced concepts of JavaScript with this course.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/javascript",
    },
    {
      type: "Course",
      title: "Advanced JavaScript",
      description: "Master the advanced concepts of JavaScript with this course.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/javascript",
    },
    {
      type: "Course",
      title: "Advanced JavaScript",
      description: "Master the advanced concepts of JavaScript with this course.",
      thumbnail: "https://via.placeholder.com/300x180",
      link: "https://example.com/course/javascript",
    },
  ];

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

      {/* Recommendations Section */}
      <div className="recommendations-container">
        <h1 className="recommendations-title">Recommendations</h1>
        <div className="recommendations-row">
          {/* Dynamic rendering of recommendation cards */}
          {recommendations.map(function (item, index) {
            return (
              <div key={index} className="recommendation-card">
                <img
                  src={item.thumbnail}
                  alt={item.type + " Thumbnail"}
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
                    View {item.type}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
