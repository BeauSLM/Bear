// chats users are in 
exports.up = function(knex, Promise) {
    return  knex.schema.createTable('user_chat', function(table) {
        table.integer('chat_id').references('id').inTable('chat');
        table.integer('member_id').references('id').inTable('user');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_chat');
}