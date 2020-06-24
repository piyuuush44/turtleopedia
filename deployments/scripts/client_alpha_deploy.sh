#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/alpha

# Install the AWS CLI
pip install awscli

# Sync the client/dist directory with the s3 bucket

# Set the cache-control max-age to 1 year for all files.
echo "Syncing with s3 bucket ${DEPLOYMENT_BUCKET}"
aws s3 sync dist/ s3://${DEPLOYMENT_BUCKET} \
  --region ${AWS_REGION} \
  --delete \
  --exclude index.html \
  --cache-control max-age=31536000,public

echo "Updating index.html"
# Fix cache policy for index.html so it is revalidated on each request
aws s3 cp dist/index.html s3://${DEPLOYMENT_BUCKET}/ \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,must-revalidate \
  --content-type text/html

# Invalidate cloudfront distribution
echo "Purging the cache from CloudFront"
aws cloudfront create-invalidation \
  --distribution-id ${CFN_DISTRIBUTION_ID} \
  --paths "/*"

echo "Done"
