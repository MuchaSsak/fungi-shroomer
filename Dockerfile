# Use the official Node.js image as the base image
FROM node:17

# Set the working directory within the container
WORKDIR /app

# Install build tools
RUN apt-get update && apt-get install -y build-essential

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install bot dependencies
RUN npm install

# Copy the rest of your bot's code to the working directory
COPY . .

# Recompile the "sodium" module
RUN npm rebuild sodium

# Specify the command to start your bot
CMD ["node", "src/index.js"]
