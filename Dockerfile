# Use an official Node.js LTS version as the base image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Quasar project
RUN npm run build

# Expose port 9000 to allow external access
EXPOSE 9000

# Command to start the server
CMD ["npm", "run", "dev"]
