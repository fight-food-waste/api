exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex('donors').del()
    .then(() =>
      // Inserts seed entries
      knex('donors').insert([
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@gmail.com',
          password: '$2a$10$KnvNlwdIYY3IEfPydywfY.8vDGc1H/momfwqKEYhO2nZLuxJdiLMq',
        },
      ]));
