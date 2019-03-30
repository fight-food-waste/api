export NODE_ENV=test
npx sequelize db:migrate:undo
npx sequelize db:migrate
npx sequelize db:seed:all
npx mocha tests/ --exit
