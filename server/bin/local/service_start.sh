#!/bin/bash

# Terminate script if any step returns with non-zero exit code, i.e. is unsuccessful
set -e

# Load the setup file
source ../setup.sh

date

print_ok "Starting the server"
./node_modules/nodemon/bin/nodemon.js ./bin/www.js
