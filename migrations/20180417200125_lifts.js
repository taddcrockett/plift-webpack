exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('lifts', function(table) {
        table.increments('id').primary();
        table.string('lift');
        table.integer('weight')
        table.integer('reps')
        table.dateTime('created');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      }),
    ]);
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('tweets'),
    ]);
  };