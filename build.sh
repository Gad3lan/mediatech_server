#!/bin/bash

echo "installing dependances..."
npm install
npm install --dev

echo "compiling typescript..."
npx tsc

echo "building docker image..."
mkdir postgres-data -p
docker-compose build

echo "done"
