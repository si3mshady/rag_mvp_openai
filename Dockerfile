# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install


# Expose port 80 for Nginx
EXPOSE 8080

# Start Nginx
CMD ["npm","start"]