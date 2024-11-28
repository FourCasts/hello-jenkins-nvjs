pipeline {
    agent any
    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        IMAGE_NAME_FRONTEND = 'frontend-app'
        IMAGE_NAME_BACKEND = 'backend-api'
        REGISTRY_URL = 'registry.gnod.lol'
        BRANCH_NAME = "${env.BRANCH_NAME}" // Captures the branch name being built
    }
    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the monorepo code
                checkout scm
            }
        }

        stage('Determine Environment') {
            steps {
                script {
                    // Validate the branch and set the environment tag
                    if (BRANCH_NAME == 'main') {
                        env.ENV_TAG = 'main'
                    } else if (BRANCH_NAME == 'staging') {
                        env.ENV_TAG = 'staging'
                    } else if (BRANCH_NAME == 'dev') {
                        env.ENV_TAG = 'dev'
                    } else {
                        error "Unsupported branch: ${BRANCH_NAME}. Allowed branches are main, staging, and dev."
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    // Build Docker image for frontend
                    sh """
                        docker build -t ${REGISTRY_URL}/${IMAGE_NAME_FRONTEND}:${ENV_TAG} -f ${FRONTEND_DIR}/Dockerfile ${WORKSPACE}
                    """
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    // Build Docker image for backend
                    sh """
                        docker build -t ${REGISTRY_URL}/${IMAGE_NAME_BACKEND}:${ENV_TAG} -f ${BACKEND_DIR}/Dockerfile ${WORKSPACE}
                    """
                }
            }
        }

        stage('Run Test') {
            steps {
                script {
                    // Run tests for the backend using the correct ENV_TAG
                    sh """
                    docker run --rm ${IMAGE_NAME_BACKEND}:${ENV_TAG} sh -c "npm test"
                    """
                }
            }
        }

        stage('Push Images to Registry') {
            steps {
                script {
                    // Push both frontend and backend images
                    sh """
                        docker push ${REGISTRY_URL}/${IMAGE_NAME_FRONTEND}:${ENV_TAG}
                        docker push ${REGISTRY_URL}/${IMAGE_NAME_BACKEND}:${ENV_TAG}
                    """
                }
            }
        }

        // // Deploy to minikube with terraform
        // stage('Terraform Init') {
        //     steps {
        //         script {
        //             // Initialize Terraform
        //             sh 'terraform init'
        //         }
        //     }
        // }

        // stage('Terraform Apply') {
        //     steps {
        //         script {
        //             // Apply Terraform configuration to deploy to Kubernetes
        //             sh 'terraform apply -auto-approve'
        //         }
        //     }
        // }

        // Uncomment this block to run backend in a Docker container
        // stage('Run Backend Docker Container') {
        //     steps {
        //         script {
        //             // Run the backend container with the environment variable
        //             sh """
        //                 docker run -d --name ${IMAGE_NAME_BACKEND}-${ENV_TAG} \
        //                 -e ENVIRONMENT=${ENV_TAG} \
        //                 -p 3000:3000 ${REGISTRY_URL}/${IMAGE_NAME_BACKEND}:${ENV_TAG}
        //             """
        //         }
        //     }
        // }

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