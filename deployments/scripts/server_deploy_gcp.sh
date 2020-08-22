#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

echo "$GCP_K8_KEY" >key.json

gcloud auth activate-service-account --key-file key.json
echo "Authenticated the key"

gcloud config set project my-turtleopedia
echo "Project set successfully"

gcloud config set compute/zone asia-southeast1-b
echo "Zone set successfully"

gcloud container clusters get-credentials turtleopedia --zone=asia-southeast1-a
echo "Cluster auth set successfully"

kubectl apply -f ../deployments/gke/turtleopedia-production-configmap.yaml
echo "Config set applied !"

kubectl delete --all pods -n=turtleopedia
echo "All previous pods deleted successfully"

kubectl set image deployment/api-service turtleopedia-1=$CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG
echo "Latest GCR Image set successfully"
