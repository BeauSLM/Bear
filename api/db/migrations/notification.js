exports.up = function(knex, Promise) {
    return  knex.schema.createTable('notification', function(table) {
        table.increments('id').primary();
        table.integer('recepient_id').references('id').inTable('user');
        table.string('text').notNullable();
        table.boolean('is_seen').defaultTo(false);
        table.timestamp('timestamp').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notification');
}