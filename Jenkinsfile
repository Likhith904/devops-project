pipeline{
    agent any
    stages{
        stage('git checkout'){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'git@github.com:Likhith904/devops-project.git']])
            }
        }
        stage('build docker image'){
            steps{
                sh 'docker build -t myproject18.azurecr.io/likhithdevopsproject .'
            }
        }
        stage('push image'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'ACR', passwordVariable: 'nOBfUH5Sq5Sy958/ImbxwutvlYXkAsw3heVIy1nBnu+ACRAU36eQ', usernameVariable: 'myproject18')]) {
                sh 'docker login -u ${username} -p ${password} myproject18.azurecr.io'
                sh 'docker push myproject18.azurecr.io/likhithdevopsproject'
                }
            }
        }
        stage('install Azure CLI'){
            steps{
                sh '''
                apk add py3-pip
                apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo make
                pip install --upgrade pip
                pip install azure-cli
                '''
            }
        }
        stage('deploy web app'){
            steps{
                withCredentials([azureServicePrincipal('AZURE_SERVICE_PRINCIPAL')]) {
                sh 'az login --service-principal -u ${AZURE_CLIENT_ID} -p ${AZURE_CLIENT_SECRET} --tenant ${AZURE_TENANT_ID}'
                }
                withCredentials([usernamePassword(credentialsId: 'ACR', passwordVariable: 'nOBfUH5Sq5Sy958/ImbxwutvlYXkAsw3heVIy1nBnu+ACRAU36eQ', usernameVariable: 'myproject18')]) {
                sh 'az webapp config container set --name 
tetris-gameapps --resource-group likhith --docker-custom-image-name myproject18.azurecr.io/likhithdevopsproject:latest --docker-registry-server-url https://myproject18.azurecr.io --docker-registry-server-user ${username} --docker-registry-server-password ${password}'
                }
            }
        }
    }
}
