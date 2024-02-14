
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments(); // GUID
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // .createTable('logins', function(table) {
    //     table.integer('user_id').references('id').inTable('users');
    //     table.string('passwordSalt').notNullable();
    //     table.string('passwordHash').notNullable();
    // })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('logins').dropTable('users');
}