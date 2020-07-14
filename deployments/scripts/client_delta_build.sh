#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/client/delta

# Install the dependencies
echo "Installing dependencies..."
npm install

ROUTE=sitemap
SITEMAP_DESTINATION=${PROJECT_ROOT}/client/delta/${ROUTE}

# make the directory where sitemap files will be stored
mkdir -p $SITEMAP_DESTINATION

date
print_ok "Starting generate_sitemap script"

# generating sitemap package
npm run generate_sitemap --d $SITEMAP_DESTINATION --r $ROUTE
date

print_ok 'Printing sitemap file'
cat $SITEMAP_DESTINATION/sitemap.xml

print_ok "Done with generate_sitemap script"

# Build
echo "Building..."
npm run build:ssr
