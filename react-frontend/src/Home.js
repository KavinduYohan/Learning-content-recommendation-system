import React from 'react';
import Navbar from './components/Navbar'; // Adjust the relative path based on your project structure
import './Home.css'; // Add Home.css for styling

function Home() {
  return (
    <div className="container">
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      <p>You have successfully logged in!</p>
    </div>
  );
}

export default Home;
