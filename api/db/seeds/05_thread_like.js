exports.seed = function (knex, Promise) {
    return knex("thread_like")
        .truncate()
        .then(function () {
            return knex("thread_like").insert([
                {
                    thread_id: 1,
                    user_id: 1,
                },
            ]);
        });
};
