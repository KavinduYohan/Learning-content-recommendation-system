from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import pickle
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import OneHotEncoder

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



@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    # Parse JSON data from the request
    data = request.json
    print("Received data:", data)  # Log incoming request data

    student_number = data.get('student_number')  # Ensure the key matches the React request body
    print("Extracted student_number:", student_number)  # Log extracted student_number

    # Check if student_number is provided
    if not student_number:
        print("Error: No student number provided in the request.")  # Log error
        return jsonify({"message": "Student number is required."}), 400

    try:
        # Load course and video recommendations from pickle files
        course_recommendations_path = 'D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/course_recommendations.pkl'
        video_recommendations_path = 'D:/Academic/4th Year/CMIS 4114 - Artificial Intelligence/leaning content recomandation/flask-backend/video_recommendations.pkl'

        print("Loading recommendations from pickle files...")  # Log file loading

        # Ensure file paths are correct and files exist
        with open(course_recommendations_path, 'rb') as f:
            course_recommendations = pickle.load(f)
        print("Course recommendations loaded successfully.")  # Log successful loading

        with open(video_recommendations_path, 'rb') as f:
            video_recommendations = pickle.load(f)
        print("Video recommendations loaded successfully.")  # Log successful loading

        # Fetch recommendations for the provided student number
        student_courses = course_recommendations.get(student_number, [])
        student_videos = video_recommendations.get(student_number, [])

        print("Recommendations fetched for student_number:", student_number)  # Log fetched data
        print("Courses:", student_courses)  # Log fetched courses
        print("Videos:", student_videos)  # Log fetched videos

        # Return recommendations as JSON
        return jsonify({
            "courses": student_courses,
            "videos": student_videos
        }), 200

    except FileNotFoundError as fnf_error:
        print("FileNotFoundError:", fnf_error)  # Log missing file error
        return jsonify({"message": "Recommendation files not found. Ensure paths are correct."}), 500
    except Exception as e:
        print("Error occurred while fetching recommendations:", e)  # Log any other error
        return jsonify({"message": "An error occurred while fetching recommendations."}), 500


if __name__ == '__main__':
    app.run(debug=True)
