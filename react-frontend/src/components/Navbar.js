import React from "react";
import "./Navbar.css"; // Separate CSS file for navbar styling

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">MyApp</h1>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
