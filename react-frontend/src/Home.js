import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaBookOpen, 
  FaYoutube, 
  FaBrain, 
  FaChartLine, 
  FaArrowRight,
  FaUniversity,
  FaGlobe,
  FaPhoneAlt
} from 'react-icons/fa';
import './Home.css';
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div className="home-modern-page">
      <Navbar />
      
      {/* Hero Section */}
      <header className="hero-modern-section">
        <div className="hero-glow-blob top-left"></div>
        <div className="hero-glow-blob bottom-right"></div>

        <div className="hero-modern-container">
          <div className="hero-text-content">
            <div className="hero-badge">
              <FaGraduationCap className="hero-badge-icon" />
              <span>Next-Gen Academic Advisory Engine</span>
            </div>
            
            <h1 className="hero-title">
              Elevate Your Learning with <span className="hero-gradient-text">AI Precision</span>
            </h1>
            
            <p className="hero-description">
              Get hyper-personalized course curricula and video tutorials tailored directly to your academic progress, performance trends, and learning styles.
            </p>
            
            <div className="hero-actions">
              <Link to="/recommendations" className="primary-hero-btn">
                <span>Explore Recommendations</span>
                <FaArrowRight />
              </Link>
              <Link to="/profile" className="secondary-hero-btn">
                <span>Complete Student Profile</span>
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Academic Courses</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Video Tutorials</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Matching Accuracy</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-card">
            <div className="visual-card-glass">
              <div className="visual-card-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="visual-card-title">Recommendation Engine v2.4</span>
              </div>
              <div className="visual-card-body">
                <div className="recommendation-mock-item">
                  <div className="mock-icon blue"><FaBrain /></div>
                  <div className="mock-text">
                    <h4>Machine Learning & Robotics</h4>
                    <p>94% Match • High Priority</p>
                  </div>
                </div>
                <div className="recommendation-mock-item">
                  <div className="mock-icon purple"><FaBookOpen /></div>
                  <div className="mock-text">
                    <h4>Advanced Data Structures</h4>
                    <p>89% Match • Reinforcement Needed</p>
                  </div>
                </div>
                <div className="recommendation-mock-item">
                  <div className="mock-icon emerald"><FaYoutube /></div>
                  <div className="mock-text">
                    <h4>Statistical Inference Series</h4>
                    <p>92% Match • Visual Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="features-modern-section">
        <div className="features-container">
          <div className="section-title-wrap">
            <span className="section-badge">Intelligent Features</span>
            <h2 className="section-heading">How Our AI Accelerates Your University Journey</h2>
            <p className="section-subtext">Designed to bridge your academic gaps and align with your future career goals</p>
          </div>

          <div className="features-modern-grid">
            <div className="modern-feature-card">
              <div className="feature-icon-box blue">
                <FaBookOpen />
              </div>
              <h3>Curated Course Path</h3>
              <p>Explore accredited university modules matched to your semester grades, career objectives, and major track.</p>
            </div>

            <div className="modern-feature-card">
              <div className="feature-icon-box red">
                <FaYoutube />
              </div>
              <h3>Targeted Video Lectures</h3>
              <p>Access high-quality visual walkthroughs and step-by-step project tutorials suited to your preferred study times.</p>
            </div>

            <div className="modern-feature-card">
              <div className="feature-icon-box emerald">
                <FaChartLine />
              </div>
              <h3>Performance Gap Analysis</h3>
              <p>Automatically discover challenging subject areas from past results to receive proactive remedial content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section">
        <div className="workflow-container">
          <div className="section-title-wrap">
            <span className="section-badge">Simplified Process</span>
            <h2 className="section-heading">Four Easy Steps to Personalized Success</h2>
          </div>

          <div className="workflow-steps-grid">
            <div className="workflow-card">
              <div className="step-count">01</div>
              <h4>Setup Profile</h4>
              <p>Input your academic degree, study preferences, and topics of interest.</p>
            </div>

            <div className="workflow-card">
              <div className="step-count">02</div>
              <h4>Record Results</h4>
              <p>Add your course grades to let the system analyze your performance trends.</p>
            </div>

            <div className="workflow-card">
              <div className="step-count">03</div>
              <h4>Cosine Matching</h4>
              <p>Our NLP & Vectorizer models compute affinity scores against thousands of materials.</p>
            </div>

            <div className="workflow-card">
              <div className="step-count">04</div>
              <h4>Master Skills</h4>
              <p>Explore tailored recommendations with direct course links and video guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / University Section */}
      <section className="uni-section">
        <div className="uni-container">
          <div className="uni-card">
            <FaUniversity className="uni-icon" />
            <h3>Personalized Learning Path Recommendation System</h3>
            <p>Wayamba University of Sri Lanka • Department of Computing & Information Systems</p>
            <div className="uni-links">
              <a href="https://www.wyb.ac.lk/" target="_blank" rel="noopener noreferrer" className="uni-link">
                <FaGlobe /> Official Website
              </a>
              <span className="uni-link">
                <FaPhoneAlt /> +94 37 228 1414
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-modern">
        <p>&copy; {new Date().getFullYear()} EduPath AI — Personalized Academic Content Recommendation System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;