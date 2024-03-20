exports.seed = function (knex, Promise) {
    return knex("reply")
        .truncate()
        .then(function () {
            return knex("reply").insert([
                {
                    thread_id: 1,
                    user_id: 1,

                    content: "Don't think your Miata would do anything against my 2006 F-150.",
                },
            ]);
        });
};
