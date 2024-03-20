exports.seed = function (knex, Promise) {
    return knex("community_page")
        .truncate()
        .then(function () {
            return knex("community_page").insert([
                {
                    community_id: 1,
                    page_name: "my cool page",
                    content: "*tyler1 freakout*",
                },
            ]);
        });
};
