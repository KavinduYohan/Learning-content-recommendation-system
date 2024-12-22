from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root", 
    password="", 
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


if __name__ == '__main__':
    app.run(debug=True)
