# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY backend/package.json /app/package.json
RUN npm install

# Copy the rest of the code
COPY backend /app

# Set environment variables
ARG NODE_ENV
ARG VERSION
ENV NODE_ENV=$NODE_ENV
ENV VERSION=$VERSION

# Expose the port your backend listens to
EXPOSE 3000

# Start the backend app
CMD ["npm", "run", "dev"]
