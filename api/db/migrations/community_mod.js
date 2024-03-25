exports.up = function(knex, Promise) {
    return knex.schema.createTable('community_mod', function(table) {
        table.int('community_id').references('id').inTable('community'); // GUID
        table.int('user_id').references('id').inTable('user'); // GUID

        table.primary(['community_id', 'user_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('community_mod');
}
