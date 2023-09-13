pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-u node' // Run as the 'node' user
        }
    }
    
    stages {
        stage('Build and Deploy') {
            steps {
                // Check out the code
                checkout scm

                // Build and deploy the Node.js application
                sh 'npm install' // Install dependencies
                sh 'npm start'   // Start the application
            }
        }
    }
    
    post {
        always {
            echo 'Deployment complete'
        }
    }
}
