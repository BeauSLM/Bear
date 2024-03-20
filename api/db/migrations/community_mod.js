exports.up = function(knex, Promise) {
    return knex.schema.createTable('community_mod', function(table) {
        table.int('community_id').primary().references('id').inTable('community'); // GUID
        table.int('user_id').primary().references('id').inTable('user'); // GUID
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('community_mod');
}
