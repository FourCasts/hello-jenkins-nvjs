# Use Node.js image to build the app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY frontend/package.json /app/package.json
RUN npm install

# Copy the rest of the frontend code
COPY frontend /app

# Build the frontend app
ARG VERSION
ENV VERSION=$VERSION

# Build the frontend app
RUN npm run build

# Use Nginx to serve the frontend app
FROM nginx:alpine

# Copy built files to Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
