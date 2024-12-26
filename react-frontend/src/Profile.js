import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [studentDetails, setStudentDetails] = useState({
    name: 'John Doe',
    age: '20',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-wrapper">
      <nav className="navbar">
        <h1 className="navbar-logo">MyApp</h1>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>

      <div className="profile-container">
        <div className="profile-left">
          <img
            src={"https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"}
            alt="Profile"
            className="profile-photo"
          />
          <div className="basic-details">
            <h2>{studentDetails.name}</h2>
            <p>Age: {studentDetails.age}</p>
            <p>Email: {studentDetails.email}</p>
            <p>Phone: {studentDetails.phone}</p>
          </div>
        </div>

        <div className="profile-right">
          <h1 className="profile-title">Update Profile</h1>
          <form className="form-container">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={studentDetails.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Enter Age"
              value={studentDetails.age}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={studentDetails.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={studentDetails.phone}
              onChange={handleChange}
            />
            <button type="button" className="save-button">Save</button>
          </form>

          <Link to="/recommendations">
            <button className="get-recommendations-button">Get Recommendations</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
