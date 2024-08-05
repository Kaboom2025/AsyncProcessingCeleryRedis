# Specify the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

EXPOSE 3000
EXPOSE 5173
# Build the app


# Expose the port on which the app will run


# Set the environment variable for the server URL


# Start the app
CMD ["npm", "run" , "dev"]
