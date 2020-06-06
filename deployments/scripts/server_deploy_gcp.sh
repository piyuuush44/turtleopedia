#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

echo $GCP_SERVICE_KEY
echo "$GCP_SERVICE_KEY" >key.json

gcloud auth activate-service-account --key-file key.json
gcloud config set project turtleopedia
gcloud config set compute/zone us-central1-c
gcloud container clusters get-credentials turtleopedia-production --zone=us-central1-c
kubectl set image deployment/turtleopedia-production turtleopedia-production=$DOCKER_IMAGE_TAG:$CI_ENVIRONMENT_SLUG

