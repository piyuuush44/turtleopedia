#!/bin/bash

# Terminate script if any step returns with non-zero exit code, i.e. is unsuccessful
set -e

source ./bin/setup.sh

print_ok "Starting the server"
node ./bin/www
