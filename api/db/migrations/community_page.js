exports.up = function(knex, Promise) {
    return knex.schema.createTable('community_section', function(table) {
        table.int('community_id').primary(); // GUID
        table.string('section_name', 50).primary();
        table.string('description').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('community_section');
}
