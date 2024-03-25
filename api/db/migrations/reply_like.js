exports.up = function(knex, Promise) {
    return knex.schema.createTable('reply_like', function(table) {
        table.integer('thread_id').references('thread_id').inTable('thread'); // GUID
        table.integer('reply_id').references('reply_id').inTable('reply');
        table.integer('user_id').references('id').inTable('user'); // GUID
        table.timestamp('time').notNullable().defaultTo(knex.fn.now());

        table.primary(['thread_id', 'reply_id', 'user_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reply_like');
}
