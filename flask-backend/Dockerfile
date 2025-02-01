# Use a specific Python version (3.10-slim) as the base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Upgrade pip
RUN pip install --upgrade pip

# Copy the requirements.txt file into the container
COPY requirements.txt /app/

# Install the dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files into the container
COPY . /app/

# Expose port 5000 to the outside world (since Flask runs on port 5000 by default)
EXPOSE 5000

# Define the command to run the application (using Python to start app.py)
CMD ["python", "app.py"]
