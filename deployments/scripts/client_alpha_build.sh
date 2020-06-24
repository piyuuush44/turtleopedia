#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/alpha

# Install the dependencies
echo "Installing dependencies..."
npm install

# Build
echo "Building..."
npm build
