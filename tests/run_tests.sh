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

echo "=> Init tables..."
mysql -h ${DB_HOST} -u ${DB_USER} ${DB_NAME} < sql/schema.sql
echo "=> Seed tables..."
mysql -h ${DB_HOST} -u ${DB_USER} ${DB_NAME} < sql/seed.sql

echo "=> Run tests..."
npx nyc mocha tests/*.test.js --exit
