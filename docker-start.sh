#!/bin/sh

# Wait for the database to be ready
./wait-for-db.sh db

# Run database migrations
# yarn typeorm migration:run

# Start the application
yarn start:prod
