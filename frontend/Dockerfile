# Use a lightweight Node.js image based on Alpine
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and lock file before dependencies installation (leverages Docker caching).
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build the application
# RUN npm run build

# Expose the port that the frontend will use
EXPOSE 3000

# Start the application in development mode
# This ensures the container stays alive as long as tail -f /dev/null is running, 
# even if the npm run dev process finishes or is killed.
CMD ["sh", "-c", "npm run dev && tail -f /dev/null"]
