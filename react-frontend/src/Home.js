import React from 'react';
import './Home.css';
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <header className="home-header">
        <div className="hero-content">
          <h1>Discover Your Next Best Experience</h1>
          <p>Personalized Recommendations Just for You</p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>
      {/* Image Section */}
<div className="hero-image">
  <img src="https://media.gettyimages.com/id/1359662582/photo/group-of-happy-college-student-stock-photo.jpg?s=612x612&w=gi&k=20&c=J-xMDmX3zw3n5kQzAl9DbYKwTi0zAJAbF6-Mm_KAiig=" alt="Hero Section Image" />
</div>

      {/* About Section */}
      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>Our AI-powered recommendation system curates content tailored to your interests.</p>
        <div className="features">
          <div className="feature">
            <h3>Smart Suggestions</h3>
            <p>Highly accurate recommendations based on your preferences.</p>
          </div>
          <div className="feature">
            <h3>Save Time</h3>
            <p>Find what you need quickly without endless searching.</p>
          </div>
          <div className="feature">
            <h3>Stay Updated</h3>
            <p>Receive real-time updates and new recommendations.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="contact-section">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out for any queries or suggestions.</p>
        <div className="contact-info">
          <p>Email: <a href="mailto:contact@recommendify.com">contact@recommendify.com</a></p>
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
