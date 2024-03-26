exports.seed = function (knex, Promise) {
    return knex("user")
        .del()
        .then(function () {
            return knex("user").insert([
                {
                    time: knex.fn.now()
                },
                {
                    time: knex.fn.now()
                }
            ]);
        });
    };