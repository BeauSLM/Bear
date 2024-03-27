exports.up = function(knex, Promise) {
    return  knex.schema.createTable('message', function(table) {
        table.increments('id').primary();
        table.integer('chat_id').references('id').inTable('chat');
        table.integer('sender_id').references('id').inTable('user');
        table.string('text').notNullable();
        table.timestamp('sent_timestamp').notNullable();
        table.timestamp('read_timestamp');

    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('message');
}
