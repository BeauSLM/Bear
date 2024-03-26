exports.up = function(knex, Promise) {
    return  knex.schema.createTable('friendship', function(table) {
        table.integer('user_id').references('id').inTable('users').primary();
        table.integer('friend_id').references('id').inTable('users');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('friendship');
}
