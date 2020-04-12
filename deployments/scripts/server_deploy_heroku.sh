#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

apt-get update -qy
apt-get install -y ruby-dev
gem install dpl
dpl --provider=heroku --app=$HEROKU_APP_NAME --api-key=$HEROKU_API_KEY
