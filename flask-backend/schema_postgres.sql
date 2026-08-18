-- PostgreSQL Schema for Learning Content Recommendation System

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Students profile table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    student_number VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    level VARCHAR(50),
    program VARCHAR(100),
    preferred_learning_method TEXT,
    preferred_study_time TEXT,
    preferred_language TEXT,
    challenging_subject_areas TEXT,
    preferred_content_platforms TEXT,
    topics_of_interest TEXT,
    future_goals TEXT,
    challenges TEXT,
    suggestions TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Results table
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    programming_fundamentals VARCHAR(50),
    data_structures_and_algorithms VARCHAR(50),
    operating_systems VARCHAR(50),
    database_systems VARCHAR(50),
    object_oriented_programming VARCHAR(50),
    advanced_software_engineering VARCHAR(50),
    artificial_intelligence VARCHAR(50),
    network_security VARCHAR(50),
    basic_electronics VARCHAR(50),
    circuit_analysis VARCHAR(50),
    microprocessor_systems VARCHAR(50),
    digital_electronics VARCHAR(50),
    embedded_systems_design VARCHAR(50),
    power_electronics VARCHAR(50),
    foundations_of_industrial_management VARCHAR(50),
    operations_management VARCHAR(50),
    strategic_management VARCHAR(50),
    linear_algebra VARCHAR(50),
    numerical_methods VARCHAR(50),
    optimization_techniques VARCHAR(50),
    introduction_to_probability_and_statistics VARCHAR(50),
    statistical_inference VARCHAR(50),
    time_series_analysis VARCHAR(50),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
