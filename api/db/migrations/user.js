exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(table) {
        table.increments('id').primary(); // GUID
        table.string('name', 32).notNullable();
        table.string('username', 32).notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('last_online');
        table.timestamp('birthday');
        table.string('gender', 16);
        table.string('avatar_url', 500);
        table.string('bio', 500);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user');
}
