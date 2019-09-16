
exports.up = function(knex) {
    console.log('creating articles table')
    return knex.schema.createTable('articles', (articlesTable) => {
        articlesTable.increments('article_id').primary()
        articlesTable.string('title').notNullable()
        articlesTable.text('body').notNullable()
        articlesTable.integer('votes').default(0).notNullable()
        articlesTable.string('topic').references('topics.slug').notNullable()
        articlesTable.string('author').references('users.username').notNullable()
        articlesTable.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
};

exports.down = function(knex) {
    console.log('dropping articles table')
    return knex.schema.dropTable('articles');
};


// article_id which is the primary key
// title
// body
// votes defaults to 0
// topic field which references the slug in the topics table
// author field that references a user's primary key (username)
// created_at defaults to the current timestamp