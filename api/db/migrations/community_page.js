exports.up = function(knex, Promise) {
    return knex.schema.createTable('community_page', function(table) {
        table.int('community_id').primary().references('id').inTable('community'); // GUID
        table.string('page_name', 50).primary();
        table.string('content').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('community_page');
}
