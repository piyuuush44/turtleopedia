# Terminate script if any step returns with non-zero exit code, i.e. is unsuccessful
set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)
source $PROJECT_ROOT/server/bin/setup.sh

# Ensure docker
if command -v docker &>/dev/null; then
  print_ok "docker available"
else
  print_error "docker not on path"
  exit 1
fi

# Shut down any test server if it was running
cd $PROJECT_ROOT/server/bin/test

# Set environment variables
set -a
. .env
set +a

print_ok "Shutting down test containers if they are up"
docker-compose down --volumes

# System start up
print_ok "Starting the service up"
docker-compose up -d

# checking for mongo to be up
TIMEOUT=30
until curl --output /dev/null --silent --fail localhost:27017; do
  printf '.'
  sleep 1
  if [[ $var -eq ${TIMEOUT} ]]; then
    exit 1
  fi
  var=$((var + 1))
done

print_ok "Mongo started"

cd $PROJECT_ROOT/server

npm install

# Run the tests
npm test

cd $PROJECT_ROOT/server/bin/test

System shutdown
docker-compose down --volumes
