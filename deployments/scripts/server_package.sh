#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

#docker build -f ./bin/$CI_ENVIRONMENT_SLUG/Dockerfile --pull -t $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG .


#docker build -f ./bin/$CI_ENVIRONMENT_SLUG/Dockerfile --pull -t $DOCKER_IMAGE_TAG:$CI_ENVIRONMENT_SLUG .



#docker push $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG

echo "$GCP_SERVICE_KEY" >key.json
docker login -u _json_key --password-stdin https://eu.gcr.io <key.json

docker push $DOCKER_IMAGE_TAG:$CI_ENVIRONMENT_SLUG
#$GCP_SERVICE_KEY  > ${HOME}/gcloud-service-key.json
#docker login -u _json_key --password-stdin https://gcr.io < ${HOME}/gcloud-service-key.json
#docker build -t gcr.io/projectid/app:${CI_COMMIT_SHA} .
#docker push "gcr.io/projectid/app:${CI_COMMIT_SHA}"
