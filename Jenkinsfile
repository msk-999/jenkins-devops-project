pipeline {
    agent { label 'dev' } // Use the label of your Jenkins agent

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from version control (e.g., Git)
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build your Docker image (replace with your build command)
                    sh 'docker build -t skeletos_backend:1.0 .'
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    // Define container and image names
                    def APP_NAME = 'skeletos_backend_container'
                    def DEPLOY_DIR = "${WORKSPACE}:/app" // Corrected syntax here
                    def DOCKER_IMAGE = 'skeletos_backend:1.0'

                    // Stop and remove existing containers with the same name
                    // sh "docker stop $APP_NAME || true"
                    // sh "docker rm $APP_NAME || true"

                    // Create a new container and run it
                    sh """
                        docker run -d --name $APP_NAME \
                          --restart=unless-stopped \
                          -v $DEPLOY_DIR \
                          -w /app \
                          -p 8000:8000 \
                          $DOCKER_IMAGE
                    """
                }
            }
        }
    }
}
