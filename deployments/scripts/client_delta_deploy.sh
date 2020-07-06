#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/delta

npm install -g firebase-tools
npm i
firebase use --token $FIREBASE_DEPLOY_KEY production
firebase deploy --non-interactive --token $FIREBASE_DEPLOY_KEY
