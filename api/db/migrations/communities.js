exports.up = function(knex, Promise) {
    return knex.schema.createTable('communities', function(table) {
        table.increments('id').primary(); // GUID
        table.string('name').notNullable();
        table.string('tagline').notNullable();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('owner_id').references('id').inTable('users');
    })
    // .createTable('logins', function(table) {
    //     table.integer('user_id').references('id').inTable('users');
    //     table.string('passwordSalt').notNullable();
    //     table.string('passwordHash').notNullable();
    // })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('communities');
}
