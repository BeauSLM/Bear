exports.seed = function (knex, Promise) {
    return knex("reply_like")
        .truncate()
        .then(function () {
            return knex("reply_like").insert([
                {
                    thread_id: 1,
                    reply_id: 1,
                    user_id: 1,
                },
            ]);
        });
};
