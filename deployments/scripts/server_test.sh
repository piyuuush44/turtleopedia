#!/bin/sh

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR
source setup.sh

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

# Set test environment variables
export DB_HOST='postgres'

# Run tests
print_start 'Running the unit tests'
npm test

print_ok 'Done'
