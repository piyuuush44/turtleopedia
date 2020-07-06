#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/delta

npm install -g firebase-tools
echo "Installed firebase tools"

firebase use --token $FIREBASE_DEPLOY_KEY my-turtleopedia
echo "Added project"

echo "Deploying now"
firebase deploy --non-interactive --token $FIREBASE_DEPLOY_KEY
echo "Deployed"
