exports.seed = function (knex, Promise) {
    return knex("community_mod")
        .truncate()
        .then(function () {
            return knex("community_mod").insert([
                {
                    community_id: 1,
                    user_id: 1,
                },
            ]);
        });
};
