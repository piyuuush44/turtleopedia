#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

echo "$GCP_SERVICE_KEY" >storagekey.json
docker login -u _json_key --password-stdin https://asia.gcr.io <storagekey.json

echo "Docker login successfully"

echo "$GCP_K8_KEY" >key.json

gcloud auth activate-service-account --key-file key.json

echo "Authenticated the key"

gcloud config set project turtleopedia

echo "Project set successfully"

gcloud config set compute/zone us-central1-c

echo "Zone set successfully"

gcloud container clusters get-credentials turtleopedia-production --zone=asia-south1-b

echo "Cluster auth set successfully"

kubectl set image deployment/turtleopedia-deployment turtleopedia=$DOCKER_IMAGE_TAG:$CI_ENVIRONMENT_SLUG
#file:///$PROJECT_ROOT/deployments/gke/turtleopedia-production.yml
