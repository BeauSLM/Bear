exports.seed = function (knex, Promise) {
    return knex("user")
        .truncate()
        .then(function () {
            return knex("user").insert([
                {
                    name: "John Doe",
                    email: "john@boring.com",
                    created_at: knex.fn.now(),
                    last_online: knex.fn.now(),
                    birthday: knex.fn.now(),
                    gender: "He/him",
                    avatar_url: "hohehum.foo",
                    bio: "kneel before me, mortals!", // NOTE(beau): copilot gave "I am a human who likes to do human things" until I fat-fingered 'k', then it gave me this LOL
                },
                {
                    name: "Jane Doe",
                    email: "email@email.com",
                    created_at: knex.fn.now(),
                    last_online: knex.fn.now(),
                    birthday: knex.fn.now(),
                    gender: "She/They",
                    avatar_url: "around_here_somewhere.lolno",
                    bio: "just a human doing human things", // copilot hits again
                },
            ]);
        });
};
