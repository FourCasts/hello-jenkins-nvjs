# Step 1: Use an official Node.js runtime as a parent image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY backend/package.json /app/package.json
RUN npm install

# Step 4: Copy the rest of the backend code
COPY backend /app

# Step 5: Expose the port your backend listens to
EXPOSE 3000

# Step 6: Define the command to run your app
CMD ["npm", "start"]
