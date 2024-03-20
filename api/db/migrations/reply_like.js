exports.up = function(knex, Promise) {
    return knex.schema.createTable('reply_like', function(table) {
        table.integer('thread_id').primary().references('thread_id').inTable('thread'); // GUID
        table.integer('reply_id').primary().references('reply_id').inTable('reply');
        table.integer('user_id').primary().references('id').inTable('user'); // GUID
        table.timestamp('time').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reply_like');
}
