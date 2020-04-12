#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

apt-get update -qy
apt-get install -y ruby-dev
gem install dpl
dpl --provider=heroku --app=skynet-api-server-staging --api-key=431d874b-039f-41cf-b5bf-10fa967b613d
