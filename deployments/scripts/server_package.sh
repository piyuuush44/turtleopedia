#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)
#pip install docker

cd $PROJECT_ROOT/server

docker info
docker login -u gitlab-ci-token -p $CI_JOB_TOKEN registry.gitlab.com
docker build -f ./bin/$CI_ENVIRONMENT_SLUG/Dockerfile --pull -t $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG .
docker push $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG
