import React from 'react';
import './Home.css';
import Navbar from "./components/Navbar"; // Import the Navbar component

function Home() {
  return (
    <div>
      <Navbar /> {/* Navbar component */}
      
      {/* Hero Section */}
      <header className="home-header">
        <h1>Discover Your Next Best Experience</h1>
        <p>Personalized Recommendations Just for You</p>
        <button className="cta-button">Get Started</button>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          Our advanced AI-powered recommendation system curates content tailored to your interests.
          Whether you're looking for courses, products, or services, we've got you covered!
        </p>
        <div className="features">
          <div className="feature">
            <h3>Smart Suggestions</h3>
            <p>Get highly accurate recommendations based on your preferences.</p>
          </div>
          <div className="feature">
            <h3>Save Time</h3>
            <p>Quickly find what you need without endless searching.</p>
          </div>
          <div className="feature">
            <h3>Stay Updated</h3>
            <p>Receive real-time updates and new recommendations regularly.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="contact-section">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out for any queries or suggestions.</p>
        <div className="contact-info">
          <p>Email: <a href="mailto:contact@recomcommendify.">contact@recommendify.com</a></p>
          <p>Phone: <a href="tel:+123456789">+123-456-789</a></p>
          <p>Address: 123 Recommendation St., AI City, World</p>
        </div>
        <div className="social-links">
          <a href="#facebook" className="social-link">Facebook</a>
          <a href="#twitter" className="social-link">Twitter</a>
          <a href="#linkedin" className="social-link">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
