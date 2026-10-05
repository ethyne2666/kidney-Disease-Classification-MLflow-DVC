
# kidney-Disease-Classification-MLflow-DV

clone the repository
```
git clone https://github.com/ethyne2666/kidney-Disease-Classification-MLflow-DVC.git
```

create virtual environment
```
py -3.8 -m venv kidney
```

*activate it*
```
.\kidney\Scripts\Activate.ps1 
```

install all the dependencies
```
pip install -r requirements.txt 
```



## Workflows

1. Update config.yaml
2. Update secrets.yaml [Optional]
3. Update params.yaml
4. Update the entity
5. Update the configuration manager in src config folder
6. Update the components
7. Update the pipeline
8. Update the main.py
9. Update the dvc.yaml
10. app.py

01_setup_data_ingestion files


the code that we have wrote in the note books we need to write in the python files this is known as *modular coding*



# MLflow

cmd
mlflow ui
#### dagshub


MLFLOW_TRACKING_URI=https://dagshub.com/charankumar2666/kidney-Disease-Classification-MLflow-DVC.mlflow <br>
MLFLOW_TRACKING_USERNAME=charankumar2666<br>
MLFLOW_TRACKING_PASSWORD=<br>
python script.py<br>



*Run this to export as env variables*:
```

$env MLFLOW_TRACKING_URI=https://dagshub.com/charankumar2666/kidney-Disease-Classification-MLflow-DVC.mlflow

$env MLFLOW_TRACKING_USERNAME=charankumar2666

$env MLFLOW_TRACKING_PASSWORD=

```
# About MLflow & DVC

### MLflow

 - Its Production Grade
 - Trace all of your expriements
 - Logging & taging your model

### DVC

 * Its very lite weight for POC only
 * lite weight expriements tracker
 * It can perform Orchestration (Creating Pipelines)

![mlflow ui different versions](image.png)

### DVC -  Data Version Control

*to track the stages's of the pipeline*
1. dvc init<br>
2. dvc repro<br>
3. dvc dag (we will get the graph for the pipeline)<br> 


## upload image & Prediction

for the image upload's from the ui that first needed to be converted to base64 first <br>

check that from the platform's like base64 guru encode and decode image's




# How to do ci-cd deployment with github action ans aws cli 
*inside the .github\workflows we have a file called main.yaml*
this is the file which manages the  ci-cd pipelines and aws deployment


# AWS-CICD-Deployment-with-Github-Actions

### Login to AWS console.
### Create IAM user for deployment

```
#with specific access

1. EC2 access : It is virtual machine

2. ECR: Elastic Container registry to save your docker image in aws


#Description: About the deployment

1. Build docker image of the source code

2. Push your docker image to ECR

3. Launch Your EC2 

4. Pull Your image from ECR in EC2

5. Lauch your docker image in EC2

#Policy:

1. AmazonEC2ContainerRegistryFullAccess

2. AmazonEC2FullAccess

```

# Create ECR repo to store/save docker image

```
- Save the URI: 566373416292.dkr.ecr.us-east-1.amazonaws.com/chicken
```


## Create EC2 machine (Ubuntu)

### Open EC2 and Install docker in EC2 Machine:

```
#optinal

sudo apt-get update -y

sudo apt-get upgrade

#required

curl -fsSL https://get.docker.com -o get-docker.sh

sudo sh get-docker.sh

sudo usermod -aG docker ubuntu

newgrp docker
```


# Configure EC2 as self-hosted runner:
```
setting>actions>runner>new self hosted runner> choose os> then run command one by one
```

# Setup github secrets:

```
AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

AWS_REGION = us-east-1

AWS_ECR_LOGIN_URI = demo>>  566373416292.dkr.ecr.ap-south-1.amazonaws.com

ECR_REPOSITORY_NAME = simple-app
```