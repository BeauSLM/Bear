exports.up = function(knex, Promise) {
    return knex.schema.createTable('thread_like', function(table) {
        table.integer('thread_id').primary(); // GUID
        table.integer('user_id').primary(); // GUID
        table.timestamp('time');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('thread_like');
}
