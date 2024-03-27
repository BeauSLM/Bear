exports.seed = function (knex, Promise) {
    return knex("chat")
        .truncate()
        .then(function () {
            return knex("chat").insert([
                {
                    id: 1,
                    start_date: new Date("2023-02-19T08:43:09")
                },
                {
                    id: 2,
                    start_date: new Date("2024-10-01T03:23:52")
                }

            ]);
        });
};