import React from "react";
import "./Home.css";
import Navbar from "./components/Navbar"; // Import Navbar component

function Home() {
  return (
    <div>
      <Navbar /> {/* Reusable Navbar Component */}
      <header className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>You have successfully logged in!</p>
      </header>
    </div>
  );
}

export default Home;
