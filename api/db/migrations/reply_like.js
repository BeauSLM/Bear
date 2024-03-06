exports.up = function(knex, Promise) {
    return knex.schema.createTable('reply_like', function(table) {
        table.integer('thread_id').primary(); // GUID
        table.integer('reply_id').primary();
        table.integer('user_id').primary(); // GUID
        table.timestamp('time');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reply_like');
}