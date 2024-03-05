exports.up = function(knex, Promise) {
    return knex.schema.createTable('login', function(table) {
        table.integer('user_id').references('id').inTable('users').primary();
        table.string('passwordSalt').notNullable();
        table.string('passwordHash').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('login');
}
