import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import MultiSelectField from './components/MultiSelectField'; // Import the reusable MultiSelectField component
import Navbar from "./components/Navbar";

function Profile() {
  const [studentDetails, setStudentDetails] = useState({
    user_id: '',
    student_number: '',
    first_name: '',
    last_name: '',
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

  const [isSubmitting, setIsSubmitting] = useState(false); // Manage form submission state
  const [message, setMessage] = useState(''); // Manage feedback message

  const levels = [1, 2, 3, 4];
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
  // Ensure e.target exists and has the correct properties
  if (!e.target) return;

  const { value, checked } = e.target;
  
  if (value !== undefined) {
    setStudentDetails((prev) => {
      const newSelections = checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);
      return { ...prev, [field]: newSelections };
    });
  }
};

  
  const handleSelectChange = (e, field) => {
    const { value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(studentDetails);
    setIsSubmitting(true);
    setMessage('Submitting your data...');

    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentDetails),
      });

      if (response.ok) {
        setMessage('Form submitted successfully!');
      } else {
        setMessage('There was an error submitting the form.');
      }
    } catch (error) {
      setMessage('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <Navbar />
    
      <div className="profile-container">
        {/* Left Sidebar */}
        <div className="profile-left">
          <img
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
            alt="Profile"
            className="profile-photo"
          />
          <div className="basic-details">
            <h2>{studentDetails.first_name} {studentDetails.last_name}</h2>
            <p>Student Number: {studentDetails.student_number}</p>
            <p>Email: {studentDetails.email}</p>
          </div>
        </div>

        {/* Center Column (Form) */}
        <div className="profile-right">
          <h1 className="profile-title">Update Profile</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <section className="form-section">
              <h3>Personal Details</h3>
              <input
                type="text"
                name="user_id"
                placeholder="Enter User ID"
                value={studentDetails.user_id}
                onChange={(e) => handleInputChange(e, 'user_id')}
              />
               <input
                type="text"
                name="student_number"
                placeholder="Enter Student Number"
                value={studentDetails.student_number}
                onChange={(e) => handleInputChange(e, 'student_number')}
              />
              <input
                type="text"
                name="first_name"
                placeholder="Enter First Name"
                value={studentDetails.first_name}
                onChange={(e) => handleInputChange(e, 'first_name')}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Enter Last Name"
                value={studentDetails.last_name}
                onChange={(e) => handleInputChange(e, 'last_name')}
              />
            </section>

            <section className="form-section">
              <h3>Academic Details</h3>
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
            </section>

            <section className="form-section">
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
              <MultiSelectField
                label="Select Challenging Subjects"
                options={challengingSubjects}
                selectedValues={studentDetails.challenging_subject_areas}
                handleCheckboxChange={handleCheckboxChange}
                fieldName="challenging_subject_areas"
              />
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
            </section>

            <section className="form-section">
              <h3>Goals & Feedback</h3>
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
            </section>

            <button type="submit" className="save-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </form>
          {message && <p className="submission-message">{message}</p>}
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
