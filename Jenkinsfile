pipeline {
    agent any
    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        IMAGE_NAME_FRONTEND = 'frontend-app'
        IMAGE_NAME_BACKEND = 'backend-api'
        REGISTRY = 'registry.gnod.lol'
    }
    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the monorepo code
                checkout scm
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    // Build Docker image for frontend
                    sh "docker build -t ${IMAGE_NAME_FRONTEND}:latest -f ${FRONTEND_DIR}/Dockerfile ${WORKSPACE}"
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    // Build Docker image for backend
                    sh "docker build -t ${IMAGE_NAME_BACKEND}:latest -f ${BACKEND_DIR}/Dockerfile ${WORKSPACE}"
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                script {
                    // Run tests for the backend
                    sh '''
                    docker run --rm ${IMAGE_NAME_BACKEND}:latest npm test
                    '''
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                script {
                    // Run tests for the frontend
                    sh '''
                    docker run --rm ${IMAGE_NAME_FRONTEND}:latest npm test
                    '''
                }
            }
        }

        // stage('Run Backend Docker Container') {
        //     steps {
        //         script {
        //             // Run the backend container (replace with your server's IP or host)
        //             sh "docker run -d --name ${IMAGE_NAME_BACKEND} -p 3000:3000 ${IMAGE_NAME_BACKEND}:latest"
        //         }
        //     }
        // }

        // stage('Run Frontend Docker Container') {
        //     steps {
        //         script {
        //             // Run the frontend container (replace with your server's IP or host)
        //             sh "docker run -d --name ${IMAGE_NAME_FRONTEND} -p 80:80 ${IMAGE_NAME_FRONTEND}:latest"
        //         }
        //     }
        // }
        stage('Tag Docker Images for Registry') {
            steps {
                script {
                    sh "docker tag ${IMAGE_NAME_FRONTEND}:latest ${REGISTRY}/${IMAGE_NAME_FRONTEND}:latest"
                    sh "docker tag ${IMAGE_NAME_BACKEND}:latest ${REGISTRY}/${IMAGE_NAME_BACKEND}:latest"
                }
            }
        }

        stage('Push Images to Registry') {
            steps {
                script {
                    sh "docker push ${REGISTRY}/${IMAGE_NAME_FRONTEND}:latest"
                    sh "docker push ${REGISTRY}/${IMAGE_NAME_BACKEND}:latest"
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Clean up unused Docker images and containers
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        always {
            // Clean up containers on Jenkins agent after pipeline
            sh "docker rm -f ${IMAGE_NAME_FRONTEND} ${IMAGE_NAME_BACKEND} || true"
        }
    }
}
