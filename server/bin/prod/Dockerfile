# specify the node base image with your desired version node:<version>
FROM node:13

# Exposing our application's default port
EXPOSE 3000

WORKDIR /opt/api_server

COPY . /opt/api_server/

# Install packages first before copying source
# This enables cached layering
RUN npm install

CMD bin/prod/start.sh
