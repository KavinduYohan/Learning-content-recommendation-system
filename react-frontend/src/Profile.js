import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import MultiSelectField from './components/MultiSelectField';// Import the reusable MultiSelectField component

function Profile() {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    level: '',
    program: '',
    preferred_learning_methods: [],
    preferred_study_times: [],
    preferred_languages: [],
    challenging_subject_areas: [],
    preferred_content_platforms: [],
    topics_of_interest: [],
    future_goals: '',
    challenges: '',
    suggestions: '',
  });

  const levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
  const programs = [
    'B.Sc. (General) Degree',
    'B.Sc. (Joint Major) Degree',
    'B.Sc. (Special) Degree',
    'B.Sc. (Special/Joint Major/General) Degree (For level 1, 2)',
  ];
  const learningMethods = [
    'Videos (YouTube, Tutorials)',
    'Text-Based (Notes, Articles)',
    'Interactive (Quizzes, Tutorials)',
    'Hands-On (Projects, Practical Work)',
  ];
  const studyTimes = ['Morning', 'Afternoon', 'Evening'];
  const languages = ['English', 'Sinhala', 'Tamil'];
  const challengingSubjects = ['Computer Sciences', 'Industrial Management', 'Electronics', 'Mathematics & Statistics'];
  const contentPlatforms = ['YouTube', 'Coursera', 'Khan Academy', 'Udemy', 'Udacity'];
  const topicsOfInterest = [
    'Web Development',
    'Machine Learning',
    'Supply Chain Management',
    'Logistics and Transportation',
    'Digital Electronics',
    'Robotics and Automation',
    'Statistical Modeling',
    'Time Series Analysis',
    'Artificial Intelligence',
    'Data Science',
    'Cybersecurity',
  ];

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setStudentDetails((prev) => {
      const newSelections = checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);
      return { ...prev, [field]: newSelections };
    });
  };

  const handleSelectChange = (e, field) => {
    const { value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', studentDetails);
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
        {/* Left Sidebar */}
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

        {/* Center Column (Form) */}
        <div className="profile-right">
          <h1 className="profile-title">Update Profile</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <div className="form-section">
              <h3>Personal Details</h3>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={studentDetails.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Enter Age"
                  value={studentDetails.age}
                  onChange={(e) => handleInputChange(e, 'age')}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={studentDetails.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={studentDetails.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                />
              </div>
            </div>

            {/* Academic Details Section */}
            <div className="form-section">
              <h3>Academic Details</h3>
              <div className="form-group">
                <select
                  value={studentDetails.level}
                  onChange={(e) => handleSelectChange(e, 'level')}
                >
                  <option value="">Select Level</option>
                  {levels.map((level, index) => (
                    <option key={index} value={level}>{level}</option>
                  ))}
                </select>
                <select
                  value={studentDetails.program}
                  onChange={(e) => handleSelectChange(e, 'program')}
                >
                  <option value="">Select Program</option>
                  {programs.map((program, index) => (
                    <option key={index} value={program}>{program}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferences Section (using MultiSelectField component) */}
            <div className="form-section">
              <h3>Preferences</h3>
              <MultiSelectField
                label="Preferred Learning Methods"
                options={learningMethods}
                selectedValues={studentDetails.preferred_learning_methods}
                handleCheckboxChange={handleCheckboxChange}
                fieldName="preferred_learning_methods"
              />
              <MultiSelectField
                label="Preferred Study Times"
                options={studyTimes}
                selectedValues={studentDetails.preferred_study_times}
                handleCheckboxChange={handleCheckboxChange}
                fieldName="preferred_study_times"
              />
              <MultiSelectField
                label="Preferred Languages"
                options={languages}
                selectedValues={studentDetails.preferred_languages}
                handleCheckboxChange={handleCheckboxChange}
                fieldName="preferred_languages"
              />
            </div>

            {/* Challenges Section */}
<div className="form-section">
  <h3>Challenges</h3>
  <div className="form-group">
    <h4>Challenging Subject Areas</h4>
    <MultiSelectField
      label="Select Challenging Subjects"
      options={challengingSubjects}
      selectedValues={studentDetails.challenging_subject_areas}
      handleCheckboxChange={handleCheckboxChange}
      fieldName="challenging_subject_areas"
    />
  </div>
</div>


            {/* Content Platforms Section */}
            <div className="form-section">
              <h3>Content Preferences</h3>
              <MultiSelectField
                label="Preferred Content Platforms"
                options={contentPlatforms}
                selectedValues={studentDetails.preferred_content_platforms}
                handleCheckboxChange={handleCheckboxChange}
                fieldName="preferred_content_platforms"
              />
              <MultiSelectField
                label="Topics of Interest"
                options={topicsOfInterest}
                selectedValues={studentDetails.topics_of_interest}
                handleCheckboxChange={handleCheckboxChange}
                fieldName="topics_of_interest"
              />
            </div>

            {/* Goals and Feedback Section */}
            <div className="form-section">
              <h3>Goals & Feedback</h3>
              <div className="form-group">
                <textarea
                  placeholder="Future Goals"
                  value={studentDetails.future_goals}
                  onChange={(e) => handleInputChange(e, 'future_goals')}
                />
                <textarea
                  placeholder="Challenges"
                  value={studentDetails.challenges}
                  onChange={(e) => handleInputChange(e, 'challenges')}
                />
                <textarea
                  placeholder="Suggestions"
                  value={studentDetails.suggestions}
                  onChange={(e) => handleInputChange(e, 'suggestions')}
                />
              </div>
            </div>

            <button type="submit" className="save-button">Save</button>
          </form>
        </div>

        {/* Right Sidebar */}
        <div className="profile-extra">
          <h2>Resources & Links</h2>
          <p>Explore recommended materials for your selected topics of interest!</p>
          <Link to="/recommendations">
            <button className="get-recommendations-button">Get Recommendations</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
