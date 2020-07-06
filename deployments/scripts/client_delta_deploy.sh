#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/delta

echo "$FIREBASE_DEPLOY_KEY"

npm install -g firebase-tools
echo "Installed firebase tools"

firebase use --token $FIREBASE_DEPLOY_KEY $FIREBASE_CI_PROJECT
echo "Added project $FIREBASE_CI_PROJECT"

echo "Deploying now"
firebase deploy --non-interactive --token $FIREBASE_DEPLOY_KEY
echo "Deployed"
