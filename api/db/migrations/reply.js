exports.up = function(knex, Promise) {
    // return knex.schema.createTable('reply', function(table) {
    //     table.integer('thread_id').primary().references('thread_id').inTable('thread'); // GUID
    //     table.increments('reply_id').primary(); // GUID
    //     table.string('content', 2000).notNullable();
    //     table.integer('user_id').notNullable().references('id').inTable('user');
    //     table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    // })
};

exports.down = function(knex, Promise) {
    // return knex.schema.dropTable('reply');
}
