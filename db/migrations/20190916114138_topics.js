
exports.up = function(knex) {
  console.log('creating topic table')
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug').primary();
    topicsTable.string('description').notNullable();
  })
};

exports.down = function(knex) {
    console.log('dropping topic table')
    return knex.schema.dropTable('topics');
};
