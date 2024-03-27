exports.up = function(knex, Promise) {
    return knex.schema.createTable('login', function(table) {
        table.integer('user_id').references('id').inTable('user');
        table.string('login_email', 200).notNullable();
        table.string('passwordSalt').notNullable();
        table.string('passwordHash').notNullable();

        table.primary(['user_id']);
    })
    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('login');
}
