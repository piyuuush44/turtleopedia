#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

docker pull $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG
docker tag $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG gcr.io/turtleopedia/turtleopedia:$CI_ENVIRONMENT_SLUG
docker push gcr.io/turtleopedia/turtleopedia:$CI_ENVIRONMENT_SLUG
