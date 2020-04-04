#!/bin/bash

# Terminate script if any step returns with non-zero exit code, i.e. is unsuccessful
set -e

source /opt/api_service/bin/setup.sh

date

/opt/api_service/node_modules/.bin/nodemon /opt/api_service/bin/www

print_ok 'Started the server! Thanks'
