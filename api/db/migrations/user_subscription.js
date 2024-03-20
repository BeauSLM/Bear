exports.up = function(knex, Promise) {
    // return knex.schema.createTable('user_subscription', function(table) {
    //     table.integer('user_id').primary().references('id').inTable('user'); // GUID
    //     table.integer('community_id').primary().references('id').inTable('community'); // GUID
    //     table.string('section').primary().references('section_name').inTable('community_section');
        // table.integer('section_id').primary().references('section_id').inTable('community_section');
    // })
};

exports.down = function(knex, Promise) {
    // return knex.schema.dropTable('user_subscription');
}
