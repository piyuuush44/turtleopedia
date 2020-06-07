#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

echo $GCP_K8_KEY
echo "$GCP_K8_KEY" >key.json

gcloud auth activate-service-account --key-file key.json

echo "Authenticated the key"

gcloud config set project turtleopedia

echo "Project set successfully"

gcloud config set compute/zone us-central1-c

echo "Zone set successfully"

gcloud container clusters get-credentials turtleopedia-production --zone=asia-south1-b

echo "Cluster auth set successfully"

kubectl set image deployment/turtleopedia-production turtleopedia=$DOCKER_IMAGE_TAG:$CI_ENVIRONMENT_SLUG
