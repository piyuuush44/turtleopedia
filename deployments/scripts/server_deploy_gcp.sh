#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

echo "$GCP_K8_KEY" >key.json

gcloud auth activate-service-account --key-file key.json
echo "Authenticated the key"

gcloud config set project turtleopedia
echo "Project set successfully"

gcloud config set compute/zone us-central1-c
echo "Zone set successfully"

gcloud container clusters get-credentials turtleopedia-production --zone=asia-south1-b
echo "Cluster auth set successfully"

kubectl apply -f file:///$PROJECT_ROOT/deployments/gke/turtleopedia-production-configmap.yaml

kubectl delete --all pods -n=turtleopedia-production
echo "All previous pods deleted successfully"

kubectl set image deployment/turtleopedia-production turtleopedia-sha256-1=$CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG -n=turtleopedia-production
echo "Latest GCR Image set successfully"

#
