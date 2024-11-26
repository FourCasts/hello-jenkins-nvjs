# hello-jenkins-nvjs (Frontend + Backend)

This is a 'hello world' app with a **Node.js** backend API and a **Vue.js** frontend, both running in Docker containers. The app is built to demonstrate API calls and the integration of both services. This repository includes instructions to run the app locally.
<!-- and set up a Jenkins pipeline for CI/CD. -->

## Prerequisites

- **Docker**: You need Docker installed to build and run the app containers.
- **Node.js**: Required for the backend (if you want to run it locally without Docker).
- **npm/yarn**: Required for installing dependencies for both frontend and backend.
<!-- - **Jenkins**: If using Jenkins for CI/CD, ensure that Jenkins is set up with a proper Docker environment. -->

## Running the App Locally (Without Docker)

### 1. **Clone the Repository**

```bash
git clone https://github.com/donghao0210/hello-jenkins-nvjs.git
cd hello-jenkins-nvjs
```

### 2. **Run the Backend**

Go to the `backend/` folder and install dependencies:

```bash
cd backend
npm install
npm start  # Runs the backend on http://localhost:3000
```

### 3. **Run the Frontend**

Go to the `frontend/` folder and install dependencies:

```bash
cd frontend
npm install
npm run serve  # Runs the frontend on http://localhost:8080
```

Now, you should be able to access the backend API on `http://localhost:3000` and the frontend on `http://localhost:8080`.

---

## Running the App with Docker

To run both the backend and frontend using Docker, follow these steps:

### 1. **Build and Run Backend Docker Container**

Navigate to the root of the repository and build the backend image:

```bash
docker build -t backend-api -f backend/Dockerfile .
docker run -d --name backend-api -p 3000:3000 backend-api
```

This will build the backend Docker image and start the container, exposing port `3000`.

### 2. **Build and Run Frontend Docker Container**

Similarly, build and run the frontend Docker image:

```bash
docker build -t frontend-app -f frontend/Dockerfile .
docker run -d --name frontend-app -p 80:80 frontend-app
```

This will build the frontend Docker image and start the container, exposing port `80`.

### 3. **Check if Containers are Running**

To check if your containers are running:

```bash
docker ps
```

You should see the `backend-api` running on port `3000` and `frontend-app` running on port `80`.

Now you can access the frontend on `http://localhost` and the backend API on `http://localhost:3000`.

<!-- ---

## Jenkins CI/CD Pipeline Setup

### 1. **Jenkinsfile Overview**

This project uses Jenkins to build Docker images and deploy the containers. The pipeline includes the following stages:
- **Install dependencies** for both frontend and backend.
- **Build Docker images** for the frontend and backend.
- **Deploy the containers** to run on the server.

### 2. **Setup Jenkins**

To use the pipeline, ensure that your Jenkins server has:
- **Docker** installed on the Jenkins agent.
- The **Jenkins Docker plugin** installed.
- Proper **permissions** to run Docker commands.

### 3. **Jenkinsfile Example**

Here’s an example `Jenkinsfile` that builds and deploys both containers:

```groovy
pipeline {
    agent any
    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        IMAGE_NAME_FRONTEND = 'frontend-app'
        IMAGE_NAME_BACKEND = 'backend-api'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME_FRONTEND}:latest -f ${FRONTEND_DIR}/Dockerfile ${WORKSPACE}"
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME_BACKEND}:latest -f ${BACKEND_DIR}/Dockerfile ${WORKSPACE}"
                }
            }
        }
        stage('Run Containers') {
            steps {
                script {
                    sh "docker run -d --name ${IMAGE_NAME_BACKEND} -p 3000:3000 ${IMAGE_NAME_BACKEND}:latest"
                    sh "docker run -d --name ${IMAGE_NAME_FRONTEND} -p 80:80 ${IMAGE_NAME_FRONTEND}:latest"
                }
            }
        }
        stage('Clean Up') {
            steps {
                script {
                    sh 'docker system prune -f'
                }
            }
        }
    }
    post {
        always {
            sh "docker rm -f ${IMAGE_NAME_FRONTEND} ${IMAGE_NAME_BACKEND}"
        }
    }
}
```

### 4. **Configure Webhooks**

To automatically trigger the Jenkins pipeline on code changes, configure a **webhook** in GitHub that points to your Jenkins instance.

---

## Additional Notes

- **Ports**: The frontend app is exposed on port `80`, and the backend API is exposed on port `3000`.
- **Environment Variables**: You may want to set environment variables (such as API URLs) for local or production environments.
- **Deployment**: If you want to deploy to a remote server, you can SSH into the server and run the `docker-compose` or `docker` commands from the Jenkins pipeline.

--- -->

## Troubleshooting

- **Docker Errors**: If you're having issues building or running Docker containers, check if Docker is installed correctly and if your user has the necessary permissions.
- **Frontend not loading**: If the frontend doesn't load, make sure the backend container is running and accessible at `http://localhost:3000`.

---
<!-- 
## Contributing

Feel free to fork this repository, make changes, and submit pull requests.

--- -->