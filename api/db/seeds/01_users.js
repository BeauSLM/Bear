exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(function () {
            return knex('users').insert([
                {id: 1, name: 'John Smith', email: 'johnsmith@gmail.com'},
                {id: 2, name: 'Jane Smith', email: 'janesmith@gmail.com'},
                {id: 3, name: 'Hugh Bass', email: 'hughbass@gmail.com'},
            ]);
        });
};