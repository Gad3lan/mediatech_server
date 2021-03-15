#!/bin/bash

echo "installing dependances..."
npm install
npm install --dev

echo "compiling typescript..."
npx tsc

echo "building docker image..."
docker build -t mediatech_server .

echo "done"