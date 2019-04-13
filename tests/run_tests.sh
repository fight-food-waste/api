#!/usr/bin/env bash

echo "=> Setting up env variables..."
export NODE_ENV=test
export DB_NAME=${DB_NAME:-'ffw_test'}
export DB_USER=${DB_USER:-'root'}

if [[ "$GITLAB_CI" = true ]];then
    export DB_HOST=mariadb
else
    export DB_HOST=${DB_HOST:-'127.0.0.1'}
fi

echo "=> Run migrations..."
npx knex migrate:rollback
npx knex migrate:latest
echo "=> Seed tables..."
npx knex seed:run

echo "=> Run tests..."
npx nyc mocha tests/*.test.js --exit
