# Use official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React application into the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose port for React app
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
