#!/usr/bin/env bash

echo "installing lerna..."
npm i -g lerna
echo "done"

cd /app

echo "cleaning..."
rm -rf node_modules
lerna exec -- rm -rf ./node_modules
echo "done"

echo "bootstrap..."
lerna bootstrap
echo "done"

echo "build dashboard"
lerna run --scope dashboard dev:build
echo "done"
