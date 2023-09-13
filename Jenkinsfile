pipeline {
    agent {
        docker { image 'node:18-alpine' }
    }
    
//    environment {
//        dockerHome = tool 'mydocker'
//        PATH = "$dockerHome/bin:$PATH"
//    }
    
    stages {
        stage('Build') {
            steps {
//              sh "node --version"
//              sh "docker --version"
                echo "Build"
                echo "PATH"
                echo "BUILD_NUMBER - $env.BUILD_NUMBER"
                echo "BUILD_ID - $env.BUILD_ID"
                echo "JOB_NAME - $env.JOB_NAME"
                echo "BUILD_TAG - $env.BUILD_TAG"
                echo "BUILD_URL - $env.BUILD_URL"
            }
        }
        
        stage('Test') {
            steps {
                echo "Test"
                echo "Integration success"
            }
        }
        
        stage('Integration Build') {
            steps {
                echo "Integration final output"
            }
        }
    }
    
    post {
        always {
            echo 'I run always'
        }
        
        success {
            echo 'I run when the build is successful'
        }
        
        failure {
            echo 'I run when the build fails'
        }
    }
}
