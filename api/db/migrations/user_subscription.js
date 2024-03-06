exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_subscription', function(table) {
        table.integer('user_id').primary(); // GUID
        table.integer('community_id').primary();
        table.string('section').primary();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_subscription');
}
