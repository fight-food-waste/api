#!/usr/bin/env bash

# In order to the load the correct ../config/config.json
if [[ "$GITLAB_CI" = true ]];then
    export NODE_ENV=gitlab-ci
else
    export NODE_ENV=test
fi

# Disable express logs to not bloat Mocha output
export NODE_LOG=false

# Init and see the database
npx sequelize db:migrate:undo
npx sequelize db:migrate
npx sequelize db:seed:all

# Run tests
npx nyc mocha tests/ --exit
