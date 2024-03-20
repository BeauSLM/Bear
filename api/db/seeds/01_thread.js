exports.seed = function (knex, Promise) {
    return knex("thread")
        .del()
        .then(function () {
            return knex("thread").insert([
                {
                    title: "I got a Miata",
                    content: "The Miata would outclass any car or truck.",
                    views: 17,
                    created: knex.fn.now(),
                },
                {
                    title: "I got a Ford F-150",
                    content: "Don't think your Miata would do anything against my 2006 F-150.",
                    views: 300,
                    created: knex.fn.now(),
                },
            ]);
        });
};