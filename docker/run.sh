#!/usr/bin/env bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEDIR=$(dirname ${SCRIPTPATH})
DIR=${BASEDIR}/:/app

docker run -it --rm -v ${DIR} node \
 sh /app/docker/entrypoint.sh
