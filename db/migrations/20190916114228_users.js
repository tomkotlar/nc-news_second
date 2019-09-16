
exports.up = function(knex) {
  console.log('creating users table')
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.string('username').primary().unique();
    usersTable.string('avatar_url').notNullable()
    usersTable.string('name').notNullable()
  })
};

exports.down = function(knex) {
    console.log('dropping users table')
    return knex.schema.dropTable('users');
};


// username which is the primary key & unique
// avatar_url
// name
