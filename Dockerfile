# Use Node.js 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all client files
COPY . .

# Expose React dev server port
EXPOSE 3000

# Start client
CMD ["npm", "start"]
