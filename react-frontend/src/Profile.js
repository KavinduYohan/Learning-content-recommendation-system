import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Select from "react-select";
import {
  FaIdCard,
  FaGraduationCap,
  FaBookOpen,
  FaBullseye,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaLanguage,
  FaLaptopCode,
  FaLightbulb,
  FaComments,
  FaLayerGroup,
  FaCompass,
  FaChartLine,
  FaRocket,
  FaUserGraduate
} from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const [studentDetails, setStudentDetails] = useState({
    student_number: "",
    first_name: "",
    last_name: "",
    level: "",
    program: "",
    preferred_learning_methods: [],
    preferred_study_times: [],
    preferred_languages: [],
    challenging_subject_areas: [],
    preferred_content_platforms: [],
    topics_of_interest: [],
    future_goals: "",
    challenges: "",
    suggestions: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  const levels = [1, 2, 3, 4];
  const programs = [
    "B.Sc. (General) Degree",
    "B.Sc. (Joint Major) Degree",
    "B.Sc. (Special) Degree",
    "B.Sc. (Special/Joint Major/General) Degree (For level 1, 2)"
  ];
  const learningMethods = [
    "Videos (YouTube, Tutorials)",
    "Text-Based (Notes, Articles)",
    "Interactive (Quizzes, Tutorials)",
    "Hands-On (Projects, Practical Work)"
  ];
  const studyTimes = ["Morning", "Afternoon", "Evening"];
  const languages = ["English", "Sinhala", "Tamil"];
  const challengingSubjects = [
    "Computer Sciences",
    "Industrial Management",
    "Electronics",
    "Mathematics & Statistics"
  ];
  const contentPlatforms = [
    "YouTube",
    "Coursera",
    "Khan Academy",
    "Udemy",
    "Udacity"
  ];
  const topicsOfInterest = [
    "Web Development",
    "Machine Learning",
    "Supply Chain Management",
    "Logistics and Transportation",
    "Digital Electronics",
    "Robotics and Automation",
    "Statistical Modeling",
    "Time Series Analysis",
    "Artificial Intelligence",
    "Data Science",
    "Cybersecurity"
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/get-user-data", {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setStudentDetails({
          student_number: data.student_number || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          level: data.level || "",
          program: data.program || "",
          preferred_learning_methods: data.preferred_learning_method
            ? data.preferred_learning_method.split(",")
            : [],
          preferred_study_times: data.preferred_study_time
            ? data.preferred_study_time.split(",")
            : [],
          preferred_languages: data.preferred_language
            ? data.preferred_language.split(",")
            : [],
          challenging_subject_areas: data.challenging_subject_areas
            ? data.challenging_subject_areas.split(",")
            : [],
          preferred_content_platforms: data.preferred_content_platforms
            ? data.preferred_content_platforms.split(",")
            : [],
          topics_of_interest: data.topics_of_interest
            ? data.topics_of_interest.split(",")
            : [],
          future_goals: data.future_goals || "",
          challenges: data.challenges || "",
          suggestions: data.suggestions || ""
        });
      } else if (response.status === 404) {
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMultiSelectChange = (selectedOptions, field) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setStudentDetails((prev) => ({ ...prev, [field]: values }));
  };

  const handleInputChange = (e, field) => {
    setStudentDetails((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ text: "Saving your profile...", type: "info" });

    try {
      const response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(studentDetails)
      });

      if (response.ok) {
        setStatusMessage({
          text: "Profile updated successfully!",
          type: "success"
        });
        setIsEditing(false);
      } else {
        const errData = await response.json();
        setStatusMessage({
          text: errData.error || "Failed to update profile.",
          type: "error"
        });
      }
    } catch (error) {
      setStatusMessage({
        text: "Network error. Please try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fullName =
    studentDetails.first_name || studentDetails.last_name
      ? `${studentDetails.first_name} ${studentDetails.last_name}`.trim()
      : "Student Profile";

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#0b1329",
      borderColor: state.isFocused ? "#10b981" : "rgba(255, 255, 255, 0.12)",
      borderRadius: "10px",
      padding: "2px 4px",
      minHeight: "42px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(16, 185, 129, 0.2)" : "none",
      "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.25)"
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      zIndex: 99
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#334155" : "transparent",
      color: state.isSelected ? "#34d399" : "#e2e8f0",
      fontSize: "13.5px",
      cursor: "pointer"
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "rgba(16, 185, 129, 0.18)",
      borderRadius: "6px"
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#34d399",
      fontWeight: 600,
      fontSize: "12px"
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#34d399",
      ":hover": {
        backgroundColor: "rgba(239, 68, 68, 0.3)",
        color: "#f87171"
      }
    }),
    input: (base) => ({
      ...base,
      color: "#ffffff"
    })
  };

  return (
    <div className="profile-page-3col">
      <Navbar />

      <div className="profile-3col-wrapper">
        {/* ================= TOP HERO DETAILS BAR ================= */}
        <div className="profile-hero-bar">
          <div className="hero-bar-main">
            <div className="hero-avatar-box">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Student Avatar"
                className="hero-avatar-image"
              />
              {studentDetails.level && (
                <span className="hero-level-chip">Lvl {studentDetails.level}</span>
              )}
            </div>

            <div className="hero-identity-text">
              <div className="hero-name-row">
                <h1 className="hero-student-name">{fullName}</h1>
                <span className="hero-id-chip">
                  <FaIdCard /> {studentDetails.student_number || "ID not assigned"}
                </span>
                {studentDetails.program && (
                  <span className="hero-program-chip">
                    <FaGraduationCap /> {studentDetails.program}
                  </span>
                )}
              </div>
              <p className="hero-meta-subtitle">
                Undergraduate Student • Department of Computing & Information Systems
              </p>
            </div>
          </div>

          <div className="hero-bar-stats-and-actions">
            <div className="hero-stat-badge">
              <span className="h-stat-lbl">Academic Level</span>
              <span className="h-stat-val">{studentDetails.level ? `Level ${studentDetails.level}` : "N/A"}</span>
            </div>
            <div className="hero-stat-badge">
              <span className="h-stat-lbl">Interests</span>
              <span className="h-stat-val">{studentDetails.topics_of_interest.length} Topics</span>
            </div>
            <div className="hero-stat-badge">
              <span className="h-stat-lbl">Study Schedule</span>
              <span className="h-stat-val">{studentDetails.preferred_study_times.join(", ") || "Flexible"}</span>
            </div>

            <div className="hero-action-buttons">
              <span className={`status-pill ${isEditing ? 'editing' : 'viewing'}`}>
                {isEditing ? "✍️ Editing" : "👁️ Viewing"}
              </span>
              {!isEditing ? (
                <button 
                  type="button" 
                  className="banner-btn-edit"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> <span>Edit Profile</span>
                </button>
              ) : (
                <button 
                  type="button" 
                  className="banner-btn-cancel"
                  onClick={() => {
                    setIsEditing(false);
                    fetchUserData();
                  }}
                >
                  <FaTimes /> <span>Cancel</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Toast Alert */}
        {statusMessage.text && (
          <div className={`status-banner ${statusMessage.type}`}>
            {statusMessage.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ================= 3 EQUAL BALANCED COLUMNS ================= */}
          <div className="profile-3col-grid">
            
            {/* COLUMN 1: Academic Information */}
            <div className="p-card col-card">
              <div className="p-section-title-wrap">
                <div className="p-icon-box blue"><FaUserGraduate /></div>
                <div>
                  <h3>Academic Credentials</h3>
                  <p>Enrollment and student information</p>
                </div>
              </div>

              <div className="p-fields-stack">
                <div className="p-field-group">
                  <label htmlFor="student_number"><FaIdCard /> Student Number</label>
                  <input
                    id="student_number"
                    type="text"
                    className="p-input"
                    placeholder="e.g. 202465"
                    value={studentDetails.student_number}
                    onChange={(e) => handleInputChange(e, "student_number")}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="p-field-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    id="first_name"
                    type="text"
                    className="p-input"
                    placeholder="e.g. John"
                    value={studentDetails.first_name}
                    onChange={(e) => handleInputChange(e, "first_name")}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="p-field-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    id="last_name"
                    type="text"
                    className="p-input"
                    placeholder="e.g. Doe"
                    value={studentDetails.last_name}
                    onChange={(e) => handleInputChange(e, "last_name")}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="p-field-group">
                  <label htmlFor="level"><FaLayerGroup /> Academic Level</label>
                  <select
                    id="level"
                    className="p-select"
                    value={studentDetails.level}
                    onChange={(e) => handleInputChange(e, "level")}
                    disabled={!isEditing}
                    required
                  >
                    <option value="">Select Level</option>
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>Level {lvl}</option>
                    ))}
                  </select>
                </div>

                <div className="p-field-group">
                  <label htmlFor="program"><FaGraduationCap /> Degree Program</label>
                  <select
                    id="program"
                    className="p-select"
                    value={studentDetails.program}
                    onChange={(e) => handleInputChange(e, "program")}
                    disabled={!isEditing}
                    required
                  >
                    <option value="">Select Program</option>
                    {programs.map((prog) => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Learning Persona & Formats */}
            <div className="p-card col-card">
              <div className="p-section-title-wrap">
                <div className="p-icon-box emerald"><FaCompass /></div>
                <div>
                  <h3>Learning Persona</h3>
                  <p>Study styles, schedules, & media channels</p>
                </div>
              </div>

              <div className="p-fields-stack">
                <div className="p-field-group">
                  <label><FaBookOpen /> Preferred Learning Methods</label>
                  {isEditing ? (
                    <Select
                      isMulti
                      styles={customSelectStyles}
                      name="preferred_learning_methods"
                      options={learningMethods.map((m) => ({ value: m, label: m }))}
                      value={studentDetails.preferred_learning_methods.map((m) => ({ value: m, label: m }))}
                      onChange={(opts) => handleMultiSelectChange(opts, "preferred_learning_methods")}
                      placeholder="Select learning styles..."
                    />
                  ) : (
                    <div className="p-tags-wrap">
                      {studentDetails.preferred_learning_methods.length > 0 ? (
                        studentDetails.preferred_learning_methods.map((m, i) => (
                          <span key={i} className="p-tag emerald">{m}</span>
                        ))
                      ) : (
                        <span className="p-empty-text">None specified</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-field-group">
                  <label><FaClock /> Preferred Study Times</label>
                  {isEditing ? (
                    <Select
                      isMulti
                      styles={customSelectStyles}
                      name="preferred_study_times"
                      options={studyTimes.map((t) => ({ value: t, label: t }))}
                      value={studentDetails.preferred_study_times.map((t) => ({ value: t, label: t }))}
                      onChange={(opts) => handleMultiSelectChange(opts, "preferred_study_times")}
                      placeholder="Select times..."
                    />
                  ) : (
                    <div className="p-tags-wrap">
                      {studentDetails.preferred_study_times.length > 0 ? (
                        studentDetails.preferred_study_times.map((t, i) => (
                          <span key={i} className="p-tag blue">{t}</span>
                        ))
                      ) : (
                        <span className="p-empty-text">None specified</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-field-group">
                  <label><FaLanguage /> Preferred Languages</label>
                  {isEditing ? (
                    <Select
                      isMulti
                      styles={customSelectStyles}
                      name="preferred_languages"
                      options={languages.map((l) => ({ value: l, label: l }))}
                      value={studentDetails.preferred_languages.map((l) => ({ value: l, label: l }))}
                      onChange={(opts) => handleMultiSelectChange(opts, "preferred_languages")}
                      placeholder="Select languages..."
                    />
                  ) : (
                    <div className="p-tags-wrap">
                      {studentDetails.preferred_languages.length > 0 ? (
                        studentDetails.preferred_languages.map((l, i) => (
                          <span key={i} className="p-tag purple">{l}</span>
                        ))
                      ) : (
                        <span className="p-empty-text">None specified</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-field-group">
                  <label><FaLaptopCode /> Preferred Platforms</label>
                  {isEditing ? (
                    <Select
                      isMulti
                      styles={customSelectStyles}
                      name="preferred_content_platforms"
                      options={contentPlatforms.map((c) => ({ value: c, label: c }))}
                      value={studentDetails.preferred_content_platforms.map((c) => ({ value: c, label: c }))}
                      onChange={(opts) => handleMultiSelectChange(opts, "preferred_content_platforms")}
                      placeholder="Select platforms..."
                    />
                  ) : (
                    <div className="p-tags-wrap">
                      {studentDetails.preferred_content_platforms.length > 0 ? (
                        studentDetails.preferred_content_platforms.map((c, i) => (
                          <span key={i} className="p-tag amber">{c}</span>
                        ))
                      ) : (
                        <span className="p-empty-text">None specified</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 3: Curriculum Focus, Weaknesses & Goals */}
            <div className="p-card col-card">
              <div className="p-section-title-wrap">
                <div className="p-icon-box purple"><FaRocket /></div>
                <div>
                  <h3>Curriculum & Targets</h3>
                  <p>Interests, weaknesses, & aspirations</p>
                </div>
              </div>

              <div className="p-fields-stack">
                <div className="p-field-group">
                  <label><FaLightbulb /> Topics of Interest</label>
                  {isEditing ? (
                    <Select
                      isMulti
                      styles={customSelectStyles}
                      name="topics_of_interest"
                      options={topicsOfInterest.map((t) => ({ value: t, label: t }))}
                      value={studentDetails.topics_of_interest.map((t) => ({ value: t, label: t }))}
                      onChange={(opts) => handleMultiSelectChange(opts, "topics_of_interest")}
                      placeholder="Select topics..."
                    />
                  ) : (
                    <div className="p-tags-wrap">
                      {studentDetails.topics_of_interest.length > 0 ? (
                        studentDetails.topics_of_interest.map((t, i) => (
                          <span key={i} className="p-tag emerald">{t}</span>
                        ))
                      ) : (
                        <span className="p-empty-text">None specified</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-field-group">
                  <label><FaExclamationCircle /> Challenging Subject Areas</label>
                  {isEditing ? (
                    <Select
                      isMulti
                      styles={customSelectStyles}
                      name="challenging_subject_areas"
                      options={challengingSubjects.map((s) => ({ value: s, label: s }))}
                      value={studentDetails.challenging_subject_areas.map((s) => ({ value: s, label: s }))}
                      onChange={(opts) => handleMultiSelectChange(opts, "challenging_subject_areas")}
                      placeholder="Select challenging subjects..."
                    />
                  ) : (
                    <div className="p-tags-wrap">
                      {studentDetails.challenging_subject_areas.length > 0 ? (
                        studentDetails.challenging_subject_areas.map((s, i) => (
                          <span key={i} className="p-tag red">{s}</span>
                        ))
                      ) : (
                        <span className="p-empty-text">None specified</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-field-group">
                  <label htmlFor="future_goals"><FaBullseye /> Future Goals</label>
                  <textarea
                    id="future_goals"
                    className="p-textarea"
                    placeholder="e.g. Software Engineer, AI Researcher..."
                    value={studentDetails.future_goals}
                    onChange={(e) => handleInputChange(e, "future_goals")}
                    disabled={!isEditing}
                  />
                </div>

                <div className="p-field-group">
                  <label htmlFor="challenges"><FaChartLine /> Learning Challenges</label>
                  <textarea
                    id="challenges"
                    className="p-textarea"
                    placeholder="e.g. Motivation, time management..."
                    value={studentDetails.challenges}
                    onChange={(e) => handleInputChange(e, "challenges")}
                    disabled={!isEditing}
                  />
                </div>

                <div className="p-field-group">
                  <label htmlFor="suggestions"><FaComments /> Suggestions / Notes</label>
                  <textarea
                    id="suggestions"
                    className="p-textarea"
                    placeholder="e.g. More practice labs..."
                    value={studentDetails.suggestions}
                    onChange={(e) => handleInputChange(e, "suggestions")}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Floating Save Toolbar in Edit Mode */}
          {isEditing && (
            <div className="profile-floating-save-bar">
              <div className="save-bar-content">
                <span className="save-bar-notice">You have unsaved changes in your profile.</span>
                <div className="save-bar-btns">
                  <button
                    type="button"
                    className="save-bar-cancel"
                    onClick={() => {
                      setIsEditing(false);
                      fetchUserData();
                    }}
                  >
                    <FaTimes /> <span>Discard</span>
                  </button>
                  <button
                    type="submit"
                    className="save-bar-submit"
                    disabled={isSubmitting}
                  >
                    <FaSave /> <span>{isSubmitting ? "Saving Profile..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;