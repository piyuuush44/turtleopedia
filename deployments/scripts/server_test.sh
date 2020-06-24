#!/bin/sh

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR
source setup.sh

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

# Set test environment variables
export NODE_ENV=local
export PORT=3000
export MONGO_USERNAME=ballu
export MONGO_PASSWORD=skynetballu123
export MONGO_HOSTNAME=mongo
export MONGO_PORT=27017
export MONGO_DB=ballu_db
export MONGO_URL_SUBSTRING=mongodb
export MONGO_DB_HELIUM=helium
export MONGO_DB_DELTA=delta
export GCS_BUCKET=turtleopedia_assets_dev
export GCLOUD_PROJECT=turtleopedia
export GCS_KEYFILE=keyfile.json
export TURTLEOPEDIA_JWT_SECRET_KEY=TURTLEOPEDIA_JWT_SECRET_KEY
export AUTH0_TEST_ACCESS_TOKEN=AUTH0_TEST_ACCESS_TOKEN

# Run tests
print_start 'Running the unit tests'
npm test

print_ok 'Done'
