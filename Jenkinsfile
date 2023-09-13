pipeline {
    agent {docker {image 'node:18-alpine'}}
      stages{
         stage('Build'){
           steps{
             sh "node --version"
             echo "success"
         }    
       }
         stage('test'){
           steps{
             echo "test"
             echo "integration success"
         }    
       }
         stage('integration Build'){
           steps{
             echo "integration final output"
         }    
       }
    }  
    post{
      always{
       echo 'Im awesome , I run always'
      }

      success{
       echo 'I run when you successful'
      }  

      failure{
       echo 'I run when you failed'
      }          
    }     
}

