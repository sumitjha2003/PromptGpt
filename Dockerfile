FROM node:20-alpine3.18 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with npm ci (faster and more reliable for CI/CD)
RUN npm ci

# Copy all other project files
COPY . .

# Build the project
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
