// individual chat
exports.up = function(knex, Promise) {
    return  knex.schema.createTable('chat', function(table) {
        table.increments('id').primary();
        table.timestamp('start_date').notNullable();
    });
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('chat');
}