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
      
              {/* Image Slider Section */}
      <div className="image-slider">
        <div className="slider-container">
          <img src="https://cdn.vysokeskoly.cz/czech-universities/uploads/2020/08/czech_University_Students.jpg" alt="Image 1" />
          <img src="https://www.shutterstock.com/image-photo/walking-happy-girl-friends-university-600nw-2477767447.jpg" alt="Image 2" />
          <img src="https://cdn.vysokeskoly.cz/czech-universities/uploads/2020/08/czech_University_Students.jpg" alt="Image 3" />
          <img src="https://t3.ftcdn.net/jpg/03/88/97/92/360_F_388979227_lKgqMJPO5ExItAuN4tuwyPeiknwrR7t2.jpg" alt="Image 4" />
        </div>
      </div>

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
