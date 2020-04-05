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
export MONGO_HOSTNAME=db-server
export MONGO_PORT=27017
export MONGO_DB=ballu_db
export MONGO_URL_SUBSTRING=mongodb
export JWT_SECRET_KEY=JWT_SECRET_KEY_LOCAL

# Run tests
print_start 'Running the unit tests'
npm test

print_ok 'Done'
