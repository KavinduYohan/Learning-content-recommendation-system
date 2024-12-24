import React from 'react';
// import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from "./components/Navbar"; // Import the Navbar component

function Home() {
  return (
    <div>
      <Navbar /> {/* Use the Navbar component here */}
      <header className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>You have successfully logged in!</p>
        {/* Adding navigation links */}
        {/* <div>
          <Link to="/profile">Go to Profile</Link>
        </div> */}
      </header>
    </div>
  );
}

export default Home;
