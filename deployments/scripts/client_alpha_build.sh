#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/berlin

echo "Creating .env file"
echo "BASE_URL=${BASE_URL}
SEGMENT_ID=${SEGMENT_ID}
PUBLIC_URL=${PUBLIC_URL}
NODE_ENV=${NODE_ENV}" > .env

# Install the dependencies
echo "Installing dependencies..."
yarn install

# Build
echo "Building..."
CI=false yarn build
