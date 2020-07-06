#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/delta

ls
ls dist/delta

echo "$FIREBASE_DEPLOY_KEY"

npm install -g firebase-tools
echo "Installed firebase tools"

npm install

firebase use --token $FIREBASE_DEPLOY_KEY $FIREBASE_CI_PROJECT
echo "Added project $FIREBASE_CI_PROJECT"

echo "Deploying now"
firebase deploy --only hosting --non-interactive --token $FIREBASE_DEPLOY_KEY
echo "Deployed"
