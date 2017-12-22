
exports.up = function(knex, Promise) {
  return knex.schema.createTable('plants', function(table) {
    table.increments();
    table.string('name');
    table.string('image');
    table.date('dateAdded');
    table.date('lastWatered');
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('plants')
};
