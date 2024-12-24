import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-logo">MyApp</h1>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>
      <div className="profile-container">
        <h1>Student Profile</h1>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={studentDetails.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={studentDetails.age}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={studentDetails.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={studentDetails.phone}
            onChange={handleChange}
          />
          <button type="button">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
