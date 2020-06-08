#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

docker build -f ./bin/$CI_ENVIRONMENT_SLUG/Dockerfile --pull -t $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG .

# please change permission of this key
echo "$GCP_SERVICE_KEY" >key.json

docker login -u _json_key --password-stdin $GCR_URL <key.json

docker push $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG
