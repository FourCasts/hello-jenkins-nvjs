# Step 1: Use Node.js image to build the app
FROM node:16 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY frontend/package.json /app/package.json
RUN npm install

# Step 4: Copy the rest of the frontend code
COPY frontend /app

# Step 5: Build the frontend app
RUN npm run build

# Step 6: Use a lightweight web server to serve the static files
FROM nginx:alpine

# Step 7: Copy built files from the build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Step 8: Expose the port that Nginx uses
EXPOSE 80

# Step 9: Nginx will automatically serve the files
CMD ["nginx", "-g", "daemon off;"]
