#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

# Install AWS Command Line Interface
# https://aws.amazon.com/cli/
apk add --update python python-dev py-pip
pip install awscli --upgrade

VERSION=$(date +%s)
docker pull $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG

echo "Inside deploy"
