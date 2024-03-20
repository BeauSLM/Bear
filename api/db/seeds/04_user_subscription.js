exports.seed = function (knex, Promise) {
    return knex("user_subscription")
        .truncate()
        .then(function () {
            return knex("user_subscription").insert([
                {
                    user_id: 1,
                    community_id: 1,
                    section_id: 1,
                },
            ]);
        });
};
