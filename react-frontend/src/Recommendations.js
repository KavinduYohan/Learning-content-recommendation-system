import React, { useState, useEffect } from "react";
import { 
  FaBookOpen, 
  FaYoutube, 
  FaSyncAlt, 
  FaExternalLinkAlt, 
  FaGraduationCap, 
  FaSparkles, 
  FaInfoCircle,
  FaCheckCircle
} from "react-icons/fa";
import "./Recommendations.css";
import Navbar from "./components/Navbar";

function Recommendations() {
  const [recommendations, setRecommendations] = useState({ courses: [], videos: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'courses', 'videos'

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        const sanitizedData = {
          courses: (data.courses || []).map(course => ({
            title: course.title || "Specialized Course",
            description: course.description && course.description !== "NaN"
              ? course.description
              : "Discover comprehensive learning modules designed to build advanced competencies in your field of study.",
            link: course.link || "#",
            thumbnail: course.thumbnail && course.thumbnail.startsWith("http")
              ? course.thumbnail
              : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
          })),
          videos: (data.videos || []).map(video => ({
            title: video.title || "Recommended Video Lecture",
            description: video.description && video.description !== "NaN"
              ? video.description
              : "Engage with visual lessons and hands-on demonstrations specifically matched to your study areas.",
            link: video.link || "#",
            thumbnail: video.thumbnail && video.thumbnail.startsWith("http")
              ? video.thumbnail
              : "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&auto=format&fit=crop&q=80"
          })),
        };

        setRecommendations(sanitizedData);
      } else {
        console.error("Failed to fetch recommendations");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const courseCount = recommendations.courses.length;
  const videoCount = recommendations.videos.length;

  return (
    <div className="recommendations-page">
      <Navbar />

      <div className="rec-container">
        {/* Header Hero Banner */}
        <div className="rec-hero-header">
          <div className="rec-hero-badge">
            <FaGraduationCap /> AI-Driven Curriculum Matcher
          </div>
          <h1 className="rec-hero-title">
            Tailored <span className="rec-text-highlight">Recommendations</span>
          </h1>
          <p className="rec-hero-subtitle">
            Curated courses and video tutorials synthesized from your profile preferences, academic grades, and topic interests.
          </p>

          <div className="rec-actions-bar">
            <button 
              className={`refresh-rec-btn ${loading ? 'loading' : ''}`}
              onClick={fetchRecommendations}
              disabled={loading}
            >
              <FaSyncAlt className={`btn-icon ${loading ? 'spin' : ''}`} />
              <span>{loading ? "Synthesizing Recommendations..." : "Refresh Recommendations"}</span>
            </button>

            {/* Filter Tabs */}
            <div className="rec-tabs">
              <button 
                className={`rec-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({courseCount + videoCount})
              </button>
              <button 
                className={`rec-tab ${activeTab === 'courses' ? 'active' : ''}`}
                onClick={() => setActiveTab('courses')}
              >
                <FaBookOpen /> Courses ({courseCount})
              </button>
              <button 
                className={`rec-tab ${activeTab === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveTab('videos')}
              >
                <FaYoutube /> Videos ({videoCount})
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton Indicator */}
        {loading && (
          <div className="rec-loading-banner">
            <div className="rec-pulse-spinner"></div>
            <p>Our cosine similarity engine is generating your personalized study pathways...</p>
          </div>
        )}

        {/* Section: Courses */}
        {(activeTab === 'all' || activeTab === 'courses') && (
          <section className="rec-section">
            <div className="section-header-box">
              <div className="section-icon-pill course-pill">
                <FaBookOpen />
              </div>
              <div>
                <h2 className="section-main-title">Recommended Academic Courses</h2>
                <p className="section-main-desc">High-impact university & platform courses matched to your learning path</p>
              </div>
            </div>

            {recommendations.courses.length > 0 ? (
              <div className="rec-cards-grid">
                {recommendations.courses.map((course, idx) => (
                  <div key={idx} className="rec-card course-card">
                    <div className="card-media-wrapper">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="card-media"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80";
                        }}
                      />
                      <span className="card-category-tag course-tag">
                        <FaBookOpen /> Course
                      </span>
                    </div>

                    <div className="card-content">
                      <h3 className="card-title" title={course.title}>
                        {course.title}
                      </h3>
                      <p className="card-description">
                        {course.description}
                      </p>
                      
                      <div className="card-footer">
                        <a 
                          href={course.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="card-action-btn course-btn"
                        >
                          <span>Explore Course</span>
                          <FaExternalLinkAlt className="action-icon" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="rec-empty-state">
                  <FaInfoCircle className="empty-icon" />
                  <h3>No Course Recommendations Found</h3>
                  <p>Update your student profile and academic results to allow our AI to generate course matches.</p>
                </div>
              )
            )}
          </section>
        )}

        {/* Section: Videos */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <section className="rec-section">
            <div className="section-header-box">
              <div className="section-icon-pill video-pill">
                <FaYoutube />
              </div>
              <div>
                <h2 className="section-main-title">Recommended Video Lectures</h2>
                <p className="section-main-desc">Video tutorials & interactive walkthroughs catered to your visual learning preferences</p>
              </div>
            </div>

            {recommendations.videos.length > 0 ? (
              <div className="rec-cards-grid">
                {recommendations.videos.map((video, idx) => (
                  <div key={idx} className="rec-card video-card">
                    <div className="card-media-wrapper">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="card-media"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&auto=format&fit=crop&q=80";
                        }}
                      />
                      <span className="card-category-tag video-tag">
                        <FaYoutube /> Video
                      </span>
                    </div>

                    <div className="card-content">
                      <h3 className="card-title" title={video.title}>
                        {video.title}
                      </h3>
                      <p className="card-description">
                        {video.description}
                      </p>
                      
                      <div className="card-footer">
                        <a 
                          href={video.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="card-action-btn video-btn"
                        >
                          <span>Watch Video</span>
                          <FaExternalLinkAlt className="action-icon" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="rec-empty-state">
                  <FaInfoCircle className="empty-icon" />
                  <h3>No Video Recommendations Found</h3>
                  <p>Update your learning preferences to discover personalized video content.</p>
                </div>
              )
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default Recommendations;
