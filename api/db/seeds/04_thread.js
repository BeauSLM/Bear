exports.seed = function (knex, Promise) {
    return knex("thread")
        .truncate()
        .then(function () {
            return knex("thread").insert([
                {
                    community_id: 1,
                    section_id: 1,
                    user_id: 1,

                    title: "I got a Miata",
                    content: "The Miata would outclass any car or truck.",
                    views: 17,
                },
                {
                    community_id: 1,
                    section_id: 2,
                    user_id: 2,

                    title: "on my third ford pinto...",
                    content: "f",
                    views: 29000000,
                },
            ]);
        });
};
