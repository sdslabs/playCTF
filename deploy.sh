#!/bin/bash

# Script to build and serve the project using a docker image.

IMAGE=beast-frontend_playctf
PORT=8080

echo 'Building image...'
docker build -t $IMAGE .

echo 'Running image...'
docker run -dp $PORT:80 $IMAGE

echo "PlayCTF build successful. App is running on port $PORT"