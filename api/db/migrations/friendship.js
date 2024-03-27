exports.up = function(knex, Promise) {
    return  knex.schema.createTable('friendship', function(table) {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('user');
        table.integer('friend_id').references('id').inTable('user');
        table.timestamp('created_at').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('friendship');
}
