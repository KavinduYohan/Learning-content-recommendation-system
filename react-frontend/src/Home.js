import React from 'react';
import './Home.css';
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <header className="home-header">
        <div className="hero-content">
          <h1>Discover Your Academic Path</h1>
          <p>AI-Powered Learning Recommendations Tailored to Your Educational Journey</p>
          <button className="cta-button">Start Learning</button>
        </div>
        
        {/* Hero Image */}
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Nob29sJTIwc3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D" alt="Students collaborating on campus" />
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>How Our AI Enhances Your University Experience</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Personalized Course Recommendations</h3>
            <p>Discover courses aligned with your academic goals, learning style, and career aspirations.</p>
          </div>

        

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Personalized Video Recommendations</h3>
            <p>Find relevant textbooks, articles, and supplementary materials tailored to your courses.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Share your academic history, interests, and learning preferences.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our algorithms analyze your profile and match it with university resources.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Recommendations</h3>
            <p>Receive personalized course, resource, and opportunity suggestions.</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Continuous Learning</h3>
            <p>The system adapts as you progress, providing increasingly refined recommendations.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"The course recommendations were spot-on! I discovered classes I never would have considered that ended up being perfect for my career goals."</p>
            <p className="testimonial-author">- Emma J., Computer Science</p>
          </div>
          
          <div className="testimonial-card">
            <p>"The study schedule optimization helped me balance my coursework with my part-time job. My grades improved significantly!"</p>
            <p className="testimonial-author">- Michael T., Business Administration</p>
          </div>
          
          <div className="testimonial-card">
            <p>"I was connected to a research opportunity that perfectly matched my interests. Now I'm working with a professor whose work I've always admired."</p>
            <p className="testimonial-author">- Sophia R., Biochemistry</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions about how our AI recommendation system can enhance your university experience?</p>
        <div className="contact-info">
          <p>Email: <a href="mailto:info@eduai-recommender.com">info@eduai-recommender.com</a></p>
          <p>Phone: <a href="tel:+123456789">+123-456-789</a></p>
          <p>Address: Campus Innovation Center, University Square, Academic City</p>
        </div>
        <div className="social-links">
          <a href="#facebook" className="social-link">Facebook</a>
          <a href="#twitter" className="social-link">Twitter</a>
          <a href="#linkedin" className="social-link">LinkedIn</a>
          <a href="#instagram" className="social-link">Instagram</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EduAI Recommender. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;