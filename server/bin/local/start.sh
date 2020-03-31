#!/bin/bash

PROJECT_ROOT=$(git rev-parse --show-toplevel)
source $PROJECT_ROOT/piyAppBackend/bin/setup.sh

# Ensure docker
if command -v docker &>/dev/null; then
  print_ok "docker available"
else
  print_error "docker not on path"
  exit 1
fi

cd $PROJECT_ROOT/piyAppBackend
yarn install

cd $PROJECT_ROOT/piyAppBackend/bin/local

# System shut down in case it was running already
print_ok "Shutting down local containers if they are up"
docker-compose down --volumes

# System start up
print_ok "Starting the service up"
docker-compose up
