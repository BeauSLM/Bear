exports.seed = function (knex, Promise) {
    return knex("user")
        .truncate()
        .then(function () {
            return knex("user").insert([
                {
                    name: "Hugh Jass",
                    username: "hughjass420",
                    created_at: knex.fn.now(),
                    last_online: knex.fn.now(),
                    birthday: knex.fn.now(),
                    gender: "He/him",
                    avatar_url: "https://api.multiavatar.com/Ninesouls.png",
                    bio: "kneel before me, mortals!", // NOTE(beau): copilot gave "I am a human who likes to do human things" until I fat-fingered 'k', then it gave me this LOL
                },
                {
                    name: "Mike Hawk",
                    username: "mikehawk69",
                    created_at: knex.fn.now(),
                    last_online: knex.fn.now(),
                    birthday: knex.fn.now(),
                    gender: "She/They",
                    avatar_url: "https://api.multiavatar.com/Vincent%20Plant.png",
                    bio: "just a human doing human things", // copilot hits again
                },
                {
                    name: "Ben Dover",
                    username: "bendover13",
                    created_at: knex.fn.now(),
                    last_online: knex.fn.now(),
                    birthday: knex.fn.now(),
                    gender: "He/Him",
                    avatar_url: "https://api.multiavatar.com/Joachim%20Molesworth.png",
                    bio: "ligma survivor", // copilot hits again
                }
            ]);
        });
};

/*
                {
                    name: "Ben Dover",
                    email: "bendover@gmail.com",
                    created_at: knex.fn.now(),
                    last_online: knex.fn.now(),
                    birthday: knex.fn.now(),
                    gender: "He/Him",
                    avatar_url: "idk.foo",
                    bio: "ligma survivor", // copilot hits again
                }
*/