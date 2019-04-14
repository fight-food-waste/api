exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('donors', (table) => {
    table.increments();
    table.timestamps();
    table.string('first_name', 60)
      .notNullable();
    table.string('middle_name', 60);
    table.string('last_name', 60)
      .notNullable();
    table.string('email')
      .notNullable()
      .unique();
    table.string('company_name', 100);
    table.string('phone_number', 60);
    table.string('password')
      .notNullable();
  }),
  knex.schema.createTable('bundles', (table) => {
    table.increments();
    table.integer('donor_id')
      .unsigned()
      .references('id')
      .inTable('donors');
    table.dateTime('submitted_at');
    // table.date('validated_at');
    // table.integer('bundle_status_id');
    // table.integer('distribution_round_id');
    // table.integer('collection_round_id');
  }),
  knex.schema.createTable('product_scanned', (table) => {
    table.increments('id')
      .primary();
    table.json('details');
    table.integer('quantity');
    table.integer('bundle_id')
      .unsigned()
      .references('id')
      .inTable('bundles');
    table.date('expiration_date');
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('donors'),
  knex.schema.dropTable('product_scanned'),
  knex.schema.dropTable('bundles'),
]);
