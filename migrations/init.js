exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name', 60)
      .notNullable();
    table.string('last_name', 60)
      .notNullable();
    table.string('email')
      .notNullable()
      .unique();
    table.string('password')
      .notNullable();
  }),
  knex.schema.createTable('bundles', (table) => {
    table.increments();
    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users');
    table.dateTime('submitted_at');
    table.integer('status')
      .defaultTo('open');
  }),
  knex.schema.createTable('products_scanned', (table) => {
    table.increments('id')
      .primary();
    // table.json('details');
    table.string('name');
    table.bigInteger('barcode');
    table.integer('quantity');
    table.integer('bundle_id')
      .unsigned()
      .references('id')
      .inTable('bundles');
    table.date('expiration_date');
    table.integer('status')
      .unsigned();
  }),
  knex.schema.createTable('user_tokens', (table) => {
    table.string('token', 64)
      .primary();
    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users');
    table.dateTime('date');
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('products_scanned'),
  knex.schema.dropTable('bundles'),
  knex.schema.dropTable('user_tokens'),
  knex.schema.dropTable('users'),
]);
