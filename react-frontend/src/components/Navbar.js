import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaGraduationCap, 
  FaHome, 
  FaUserGraduate, 
  FaClipboardList, 
  FaLightbulb, 
  FaSignOutAlt, 
  FaSignInAlt 
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("user_id");
  const username = localStorage.getItem("username") || "Student";

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <Link to={isLoggedIn ? "/home" : "/"} className="navbar-brand">
          <div className="brand-icon-wrapper">
            <FaGraduationCap className="brand-icon" />
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-title">EduPath<span className="brand-highlight">AI</span></span>
            <span className="brand-subtitle">Smart Recommendation</span>
          </div>
        </Link>

        <ul className="navbar-menu">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/home" className={`nav-link ${isActive('/home') ? 'active' : ''}`}>
                  <FaHome className="nav-icon" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                  <FaUserGraduate className="nav-icon" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/results" className={`nav-link ${isActive('/results') ? 'active' : ''}`}>
                  <FaClipboardList className="nav-icon" />
                  <span>Academic Results</span>
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className={`nav-link ${isActive('/recommendations') ? 'active' : ''}`}>
                  <FaLightbulb className="nav-icon" />
                  <span>Recommendations</span>
                </Link>
              </li>
            </>
          ) : null}
        </ul>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <div className="user-profile-widget">
              <span className="user-badge">{username.charAt(0).toUpperCase()}</span>
              <span className="user-name-label">{username}</span>
              <button onClick={handleLogout} className="logout-button" title="Sign Out">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-nav-btn">
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
