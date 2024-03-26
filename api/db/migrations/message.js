exports.up = function(knex, Promise) {
    return  knex.schema.createTable('message', function(table) {
        table.integer('message_id').primary();
        table.integer('conversation_id'); //references conversation PK
        table.timestamp('sent_timestamp').notNullable();
        table.timestamp('received_timestamp').notNullable();
        table.integer('friend_id').references('id').inTable('users');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('message');
}
