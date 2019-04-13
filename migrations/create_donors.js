exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('donors', (table) => {
    table.increments();
    table.timestamps();
    table.string('first_name', 60).notNullable();
    table.string('middle_name', 60);
    table.string('last_name', 60).notNullable();
    table.string('email').notNullable().unique();
    table.string('company_name', 100);
    table.string('phone_number', 60);
    table.string('password').notNullable();
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('donors'),
]);
