#!/bin/sh

echo "start the app in watch mode"
cd app
source /app.env

reflex -c ./reflex.conf