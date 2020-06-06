#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

docker info
docker build -f ./bin/$CI_ENVIRONMENT_SLUG/Dockerfile --pull -t $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG .
docker push $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG
