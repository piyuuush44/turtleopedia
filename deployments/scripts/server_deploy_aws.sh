#!/bin/sh

set -e

PROJECT_ROOT=$(git rev-parse --show-toplevel)

cd $PROJECT_ROOT/server

# Install AWS Command Line Interface
# https://aws.amazon.com/cli/
apk add --update python python-dev py-pip
pip install awscli --upgrade

VERSION=$(date +%s)
docker pull $CI_REGISTRY_IMAGE:$CI_ENVIRONMENT_SLUG

# Log into AWS docker registry
# The `aws ecr get-login` command returns a `docker login` command with
# the credentials necessary for logging into the AWS Elastic Container Registry
# made available with the AWS access key and AWS secret access keys above.
# The command returns an extra newline character at the end that needs to be stripped out.
$(aws ecr get-login --no-include-email --region $AWS_REGION | tr -d '\r')
# Push the updated Docker container to the AWS registry.
# Using the $CI_ENVIRONMENT_SLUG variable provided by GitLab, we can use this same script
# for all of our environments (production and staging). This variable equals the environment
# name defined for this job in gitlab-ci.yml.
docker tag $CI_REGISTRY_IMAGE:${CI_ENVIRONMENT_SLUG} "${ECR_URL}/${ECR_IMAGE_NAME}:${CI_ENVIRONMENT_SLUG}-${VERSION}"
docker tag $CI_REGISTRY_IMAGE:${CI_ENVIRONMENT_SLUG} "${ECR_URL}/${ECR_IMAGE_NAME}:latest-${CI_ENVIRONMENT_SLUG}"

docker push "${ECR_URL}/${ECR_IMAGE_NAME}:${CI_ENVIRONMENT_SLUG}-${VERSION}"
docker push "${ECR_URL}/${ECR_IMAGE_NAME}:latest-${CI_ENVIRONMENT_SLUG}"

# The AWS registry now has our new container, but our cluster isn't aware that a new version
# of the container is available. We need to create an updated task definition. Task definitions
# always have a version number. When we register a task definition using a name that already
# exists, AWS automatically increments the previously used version number for the task
# definition with that same name and uses it here. Note that we also define CPU and memory
# requirements here and give it a JSON file describing our task definition that I've saved
# to my repository in a aws/ directory.
aws ecs register-task-definition --family ${ECS_TASK_DEFINITION_NAME}-${CI_ENVIRONMENT_SLUG} --requires-compatibilities FARGATE --cpu ${ECS_CPU_SHARES} --memory ${ECS_MEMORY} --cli-input-json file:///$PROJECT_ROOT/deployments/aws/instanthome_task_definition-${CI_ENVIRONMENT_SLUG}.json --region $AWS_REGION

# Tell our service to use the latest version of task definition.
aws ecs update-service --cluster instanthome-${CI_ENVIRONMENT_SLUG} --service instanthome --task-definition ${ECS_TASK_DEFINITION_NAME}-${CI_ENVIRONMENT_SLUG} --region $AWS_REGION
