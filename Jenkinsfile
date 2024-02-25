pipeline {
    agent any
  environment {
    registry = ""
    dockerContainerName = 'souz-frontend'
    dockerImageName = 'souz-frontend-image'
  }
  stages {
    // stage('Build') {
    //    steps {
        
    //    }
    // }
  stage('docker-compose start') {
      steps {
        sh 'docker compose up -d'
      }
    }
  }
}