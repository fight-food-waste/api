/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users')
        .insert([
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@gmail.com',
            password: '$2a$10$KnvNlwdIYY3IEfPydywfY.8vDGc1H/momfwqKEYhO2nZLuxJdiLMq',
          },
        ]))
    .then(() =>
      knex('user_tokens')
        .del()
        .then(() =>
          knex('user_tokens')
            .insert([
              {
                token: '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b',
                user_id: 1,
                date: '2019-04-19 13:46:57',
              },
            ])));
