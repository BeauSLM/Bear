exports.up = function(knex, Promise) {
    return  knex.schema.createTable('friend_request', function(table) {
        table.increments('id').primary();
        table.integer('sender_id').references('id').inTable('user');
        table.integer('recipient_id').references('id').inTable('user');
        table.boolean('is_accepted').defaultTo(false);
        table.timestamp('sent_timestamp').notNullable();
        table.timestamp('accepted_timestamp');
    });
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('friend_request');
}
