
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('password').notNullable();
  }).then(function(table) {
    return knex.schema.createTable('plants', function(table) {
    table.increments();
    table.string('name');
    table.string('image');
    table.string('dateAdded');
    table.string('lastWatered');
    table.integer('user_id').notNullable().references('id').inTable('users');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('plants').then(function() {
    return knex.schema.dropTable('users')
  });
};
