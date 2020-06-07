#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

docker build -f ./bin/$CI_ENVIRONMENT_SLUG/Dockerfile --pull -t $DOCKER_IMAGE_TAG:$CI_ENVIRONMENT_SLUG .

echo $GCP_SERVICE_KEY
echo "$GCP_SERVICE_KEY" >key.json
docker login -u _json_key --password-stdin https://asia.gcr.io <key.json

docker push $DOCKER_IMAGE_TAG:$CI_ENVIRONMENT_SLUG

