exports.up = function(knex, Promise) {
    return knex.schema.createTable('thread', function(table) {
        table.integer('community_id').primary();
        table.string('section').primary();
        table.increments('thread_id').primary();
        table.string('title', 100).notNullable();
        table.string('content', 2000).notNullable();
        table.integer('user_id').notNullable();
        table.integer('views').notNullable().defaultTo(0);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_subscription');
}
