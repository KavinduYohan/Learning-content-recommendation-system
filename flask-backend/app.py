from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import OneHotEncoder

import pandas as pd
import logging



app = Flask(__name__)
CORS(app)

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root", 
    password="Kavindu1495?", 
    database="learningContent"  
)

cursor = db.cursor()
cursor.execute("SHOW TABLES")
print(cursor.fetchall())  # Verify that tables are listed


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    try:
        cursor = db.cursor()  # Create a cursor for the current request
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        db.commit()
        return jsonify({"message": "User signed up successfully!"})
    except mysql.connector.IntegrityError as e:
        print("Integrity Error:", e)  # Log the exact error
        return jsonify({"message": "Username already exists."}), 400
    except Exception as e:
        print("Error:", e)  # Log any other errors
        return jsonify({"message": "An error occurred."}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    if user:
        return jsonify({"message": "Login successful!"})
    else:
        return jsonify({"message": "Invalid username or password."}), 401

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    try:
        with db.cursor() as cursor:  # Automatically closes the cursor

            # Extract form data
            user_id = data.get('user_id')
            student_number = data.get('student_number')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            level = data.get('level')
            program = data.get('program')
            preferred_learning_methods = ','.join(data.get('preferred_learning_methods', [])) or None
            preferred_study_times = ','.join(data.get('preferred_study_times', [])) or None
            preferred_languages = ','.join(data.get('preferred_languages', [])) or None
            challenging_subject_areas = ','.join(data.get('challenging_subject_areas', [])) or None
            preferred_content_platforms = ','.join(data.get('preferred_content_platforms', [])) or None
            topics_of_interest = ','.join(data.get('topics_of_interest', [])) or None
            future_goals = data.get('future_goals')
            challenges = data.get('challenges')
            suggestions = data.get('suggestions')

            # Validate required fields
            if not (user_id and student_number and first_name and last_name and level and program):
                return jsonify({"message": "Missing required fields"}), 400

            # Insert data into the database
            cursor.execute(""" 
                INSERT INTO students (
                    user_id, student_number, first_name, last_name, level, program,
                    preferred_learning_method, preferred_study_time, preferred_language,
                    challenging_subject_areas, preferred_content_platforms,
                    topics_of_interest, future_goals, challenges, suggestions
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (user_id, student_number, first_name, last_name, level, program,
                  preferred_learning_methods, preferred_study_times, preferred_languages,
                  challenging_subject_areas, preferred_content_platforms,
                  topics_of_interest, future_goals, challenges, suggestions))

            db.commit()

    except Exception as e:
        import traceback
        print("Error:", traceback.format_exc())
        return jsonify({"message": "An internal error occurred. Please try again later."}), 500

    return jsonify({"message": "Form submitted successfully!"}), 201


# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load matrices and models
video_matrix = np.load('D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/video_matrix.npy')
course_matrix = np.load('D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/course_matrix.npy')

# Load pickled objects
with open('D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/tfidf_vectorizer.pkl', 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

with open('D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/onehot_encoder.pkl', 'rb') as f:
    onehot_encoder = pickle.load(f)

# Load CSV files
videos_df = pd.read_csv('D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/course_recommendations_multilang.csv')
courses_df = pd.read_csv('D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/synthetic_courses_dataset2.csv')


# Helper function to preprocess student data into feature vector
def preprocess_student_data(student_row):
    student_preferences = " ".join(str(field) for field in student_row[6:12] if field)  # Preferred methods, languages, etc.
    student_vector = tfidf_vectorizer.transform([student_preferences])
    logging.debug(f"Preprocessing student data... Preferences: {student_preferences}")
    logging.debug(f"Student vector shape: {student_vector.shape}")
    return student_vector

@app.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.json
    student_number = data.get('student_number')

    logging.debug(f"Received student number: {student_number}")

    # Fetch student data from MySQL (assuming MySQL connection is set up elsewhere)
    cursor.execute("SELECT * FROM students WHERE student_number = %s", (student_number,))
    student_row = cursor.fetchone()

    if not student_row:
        logging.error(f"Student not found: {student_number}")
        return jsonify({"error": "Student not found"}), 404

    logging.debug(f"Fetched student row: {student_row}")

    # Transform student data to vector
    student_vector = preprocess_student_data(student_row)

    # Compute recommendations
    course_scores = cosine_similarity(student_vector, course_matrix).flatten()
    top_course_indices = np.argsort(course_scores)[-5:][::-1]  # Top 5 courses
    video_scores = cosine_similarity(student_vector, video_matrix).flatten()
    top_video_indices = np.argsort(video_scores)[-5:][::-1]  # Top 5 videos

    logging.debug(f"Top course indices: {top_course_indices}")
    logging.debug(f"Top video indices: {top_video_indices}")

    # Prepare recommendations response
    recommended_courses = [
        {
            "title": courses_df.iloc[i]["Title"],
            "description": courses_df.iloc[i]["Description"],
            "link": courses_df.iloc[i]["URLs"],
            "thumbnail": courses_df.iloc[i].get("Images", "https://via.placeholder.com/300x180")
        }
        for i in top_course_indices
    ]
    recommended_videos = [
        {
            "title": videos_df.iloc[i]["Title"],
            "description": videos_df.iloc[i]["Description"],
            "link": videos_df.iloc[i]["URLs"],
            "thumbnail": videos_df.iloc[i].get("Images", "https://via.placeholder.com/300x180")
        }
        for i in top_video_indices
    ]

    # Log final recommendations
    logging.debug(f"Recommended courses: {recommended_courses}")
    logging.debug(f"Recommended videos: {recommended_videos}")

    return jsonify({"courses": recommended_courses, "videos": recommended_videos})

if __name__ == '__main__':
    app.run(debug=True)
