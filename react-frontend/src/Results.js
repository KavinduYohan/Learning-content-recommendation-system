import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaClipboardList, 
  FaSave, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaLayerGroup, 
  FaLaptopCode, 
  FaMicrochip, 
  FaChartBar, 
  FaCalculator 
} from "react-icons/fa";
import './Results.css';
import Navbar from "./components/Navbar";

const courseCategories = [
  {
    category: "Computer Science & Software",
    icon: FaLaptopCode,
    badgeColor: "#3b82f6",
    fields: [
      { key: "programming_fundamentals", label: "Programming Fundamentals (CMIS 2123)" },
      { key: "data_structures_and_algorithms", label: "Data Structures & Algorithms (CMIS 2214)" },
      { key: "operating_systems", label: "Operating Systems (CMIS 3114)" },
      { key: "database_systems", label: "Database Systems (CMIS 3122)" },
      { key: "object_oriented_programming", label: "Object-Oriented Programming (CMIS 3134)" },
      { key: "advanced_software_engineering", label: "Advanced Software Engineering (CMIS 4114)" },
      { key: "artificial_intelligence", label: "Artificial Intelligence (CMIS 4123)" },
      { key: "network_security", label: "Network Security (CMIS 4134)" }
    ]
  },
  {
    category: "Electronics & Systems",
    icon: FaMicrochip,
    badgeColor: "#8b5cf6",
    fields: [
      { key: "basic_electronics", label: "Basic Electronics (ELTN 2112)" },
      { key: "circuit_analysis", label: "Circuit Analysis (ELTN 2232)" },
      { key: "microprocessor_systems", label: "Microprocessor Systems (ELTN 3113)" },
      { key: "digital_electronics", label: "Digital Electronics (ELTN 3133)" },
      { key: "embedded_systems_design", label: "Embedded Systems Design (ELTN 4114)" },
      { key: "power_electronics", label: "Power Electronics (ELTN 4213)" }
    ]
  },
  {
    category: "Industrial Management",
    icon: FaChartBar,
    badgeColor: "#f59e0b",
    fields: [
      { key: "foundations_of_industrial_management", label: "Foundations of Industrial Mgmt (IMGT 2112)" },
      { key: "operations_management", label: "Operations Management (IMGT 3112)" },
      { key: "strategic_management", label: "Strategic Management (IMGT 4016)" }
    ]
  },
  {
    category: "Mathematics & Statistics",
    icon: FaCalculator,
    badgeColor: "#10b981",
    fields: [
      { key: "linear_algebra", label: "Linear Algebra (MATH 2114)" },
      { key: "numerical_methods", label: "Numerical Methods (MATH 3114)" },
      { key: "optimization_techniques", label: "Optimization Techniques (MATH 4114)" },
      { key: "introduction_to_probability_and_statistics", label: "Intro to Prob & Statistics (STAT 2112)" },
      { key: "statistical_inference", label: "Statistical Inference (STAT 3112)" },
      { key: "time_series_analysis", label: "Time Series Analysis (STAT 4114)" }
    ]
  }
];

const gradeOptions = ["None", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "E"];

const Results = () => {
  const [results, setResults] = useState({
    programming_fundamentals: '',
    data_structures_and_algorithms: '',
    operating_systems: '',
    database_systems: '',
    object_oriented_programming: '',
    advanced_software_engineering: '',
    artificial_intelligence: '',
    network_security: '',
    basic_electronics: '',
    circuit_analysis: '',
    microprocessor_systems: '',
    digital_electronics: '',
    embedded_systems_design: '',
    power_electronics: '',
    foundations_of_industrial_management: '',
    operations_management: '',
    strategic_management: '',
    linear_algebra: '',
    numerical_methods: '',
    optimization_techniques: '',
    introduction_to_probability_and_statistics: '',
    statistical_inference: '',
    time_series_analysis: ''
  });

  const [studentId, setStudentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setStudentId(user_id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResults(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      setStatusMessage({ text: "User session expired. Please login again.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        'http://localhost:5000/submit-results',
        { ...results, student_id: studentId },
        { withCredentials: true }
      );
      setStatusMessage({ text: response.data.message || "Academic grades saved successfully!", type: "success" });
    } catch (error) {
      console.error('Error submitting results:', error);
      setStatusMessage({ 
        text: error.response?.data?.error || "Error saving results. Please verify your connection.", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="results-page">
      <Navbar />

      <div className="results-wrapper">
        {/* Header Hero */}
        <div className="results-hero">
          <div className="results-badge">
            <FaClipboardList /> Academic Performance Record
          </div>
          <h1 className="results-title">
            Course Performance & <span className="results-highlight">Grades</span>
          </h1>
          <p className="results-subtitle">
            Provide your obtained course grades. Our machine learning recommendation engine uses these to identify academic strengths and suggest supplementary materials.
          </p>
        </div>

        {/* Status Notification Banner */}
        {statusMessage.text && (
          <div className={`status-toast ${statusMessage.type}`}>
            {statusMessage.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Grades Form */}
        <form onSubmit={handleSubmit} className="results-form">
          <div className="categories-grid">
            {courseCategories.map((group, groupIdx) => {
              const Icon = group.icon;
              return (
                <div key={groupIdx} className="category-card">
                  <div className="category-header">
                    <div className="category-icon" style={{ backgroundColor: `${group.badgeColor}20`, color: group.badgeColor }}>
                      <Icon />
                    </div>
                    <div>
                      <h3 className="category-title">{group.category}</h3>
                      <span className="category-count">{group.fields.length} Subjects</span>
                    </div>
                  </div>

                  <div className="category-fields-list">
                    {group.fields.map((field) => (
                      <div key={field.key} className="grade-field-row">
                        <label htmlFor={field.key} className="field-name-label">
                          {field.label}
                        </label>
                        <div className="select-container">
                          <select
                            id={field.key}
                            name={field.key}
                            value={results[field.key]}
                            onChange={handleChange}
                            className={`grade-select ${results[field.key] && results[field.key] !== 'None' ? 'has-grade' : ''}`}
                          >
                            <option value="">Select Grade</option>
                            {gradeOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Actions Footer */}
          <div className="results-submit-bar">
            <button 
              type="submit" 
              className="submit-results-btn"
              disabled={isSubmitting}
            >
              <FaSave />
              <span>{isSubmitting ? "Saving Academic Profile..." : "Save Academic Grades"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Results;