pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        stage('Build and Deploy') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm run build'
                        }
                    }
                }
                stage('Deploy Backend') {
                    steps {
                        dir('backend') {
                            sh 'npm run deploy' // Customize this with your deploy command
                        }
                    }
                }
            }
        }
    }
}
