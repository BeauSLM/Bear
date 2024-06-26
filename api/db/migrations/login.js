exports.up = function(knex, Promise) {
    return knex.schema.createTable('login', function(table) {
        table.integer('user_id').references('id').inTable('user').primary();
        table.string('passwordHash').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('login');
}
