#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

apt-get update -qy
apt-get install -y ruby-dev
gem install dpl
echo $HEROKU_API_KEY
echo $HEROKU_APP_STAGING
dpl --provider=heroku --app=$HEROKU_APP_STAGING --api-key=$HEROKU_API_KEY
