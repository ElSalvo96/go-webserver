#!/bin/sh
set -e

echo "start client in watch mode"

# Watch for changes in the swagger file
bun run get-swagger-from-server.ts & 

bun run dev &

wait