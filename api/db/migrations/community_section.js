exports.up = function(knex, Promise) {
    return knex.schema.createTable('community_section', function(table) {
        table.increments('section_id').primary(); // GUID
        table.int('community_id').notNullable().references('id').inTable('community'); // GUID
        table.string('section_name', 50).unique();
        table.string('description').notNullable();
        table.timestamp('last_accessed').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('community_section');
}
