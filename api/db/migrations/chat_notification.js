exports.up = function(knex, Promise) {
    return  knex.schema.createTable('chat_notification', function(table) {
        table.increments('id').primary();
        table.integer('recipient_id').references('id').inTable('user').notNullable();
        table.integer('message_id').references('id').inTable('message').notNullable();
        table.boolean('is_seen').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('chat_notification');
}