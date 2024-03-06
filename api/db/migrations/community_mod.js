exports.up = function(knex, Promise) {
    return knex.schema.createTable('community_mod', function(table) {
        table.int('community_id').primary(); // GUID
        table.int('user_id').primary();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('community_mod');
}
