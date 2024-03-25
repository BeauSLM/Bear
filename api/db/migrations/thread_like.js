exports.up = function(knex, Promise) {
    return knex.schema.createTable('thread_like', function(table) {
        table.integer('thread_id').references('thread_id').inTable('thread'); // GUID
        table.integer('user_id').references('id').inTable('user'); // GUID
        table.timestamp('time').notNullable().defaultTo(knex.fn.now());

        table.primary(['thread_id', 'user_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('thread_like');
}
