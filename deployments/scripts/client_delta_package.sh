#!/bin/sh

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd $DIR
source setup.sh

# fetching the root project directory
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# moving the pointer to server's directory
cd $PROJECT_ROOT/server

ROUTE=sitemap
SITEMAP_DESTINATION=${PROJECT_ROOT}/client/delta/dist/dist/browser/${ROUTE}

npm install

# moving the pointer to london's directory
cd $PROJECT_ROOT/client/delta

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
