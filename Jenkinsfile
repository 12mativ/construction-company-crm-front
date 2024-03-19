pipeline {
    agent any
    environment {
        registry = ""
        dockerContainerName = 'souz-frontend'
        dockerImageName = 'souz-frontend-image'
    }
    stages {
        stage('create .env file') { // TODO: redo with OS env variables
            steps {
                sh 'echo "NEXT_PUBLIC_BASE_URL=http://176.109.106.55:8000\nNEXT_PUBLIC_SERVER_PROTOCOL=http\nNEXT_PUBLIC_SERVER_HOSTNAME=176.109.106.55\nNEXT_PUBLIC_SERVER_PORT=8000" >> .env.local'
            }
        }
        // stage('Build') {
        //    steps {
            
        //    }
        // }
        stage('clean container') {
            steps {
                sh 'docker ps -f name=${dockerContainerName} -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=${dockerContainerName} -q | xargs -r docker container rm'
                sh 'docker images -q --filter=reference=${dockerImageName} | xargs --no-run-if-empty docker rmi -f'
            }
        }
        stage('docker-compose start') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}