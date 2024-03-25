exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_subscription', function(table) {
        table.integer('user_id').references('id').inTable('user'); // GUID
        table.integer('community_id').references('id').inTable('community'); // GUID
        table.integer('section_id').references('section_id').inTable('community_section');

        table.primary(['user_id', 'community_id', 'section_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_subscription');
}
