exports.seed = function (knex, Promise) {
    return knex("community_section")
        .truncate()
        .then(function () {
            return knex("community_section").insert([
                {
                    community_id: 1,
                    section_name: "section",
                    description: "like most things on the internet, reading this is totally a great use of your time...",
                },
            ]);
        });
};
