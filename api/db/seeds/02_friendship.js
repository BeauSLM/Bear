exports.seed = function (knex, Promise) {
    return knex("friendship")
        .del()
        .then(function () {
            return knex("friendship").insert([
                {
                    // 1 and 2 are friends
                    user_id: 1,
                    friend_id: 2,
                    created_at: new Date("2023-02-17T23:13:27")
                },
                {
                    user_id: 2,
                    friend_id: 1,
                    created_at: new Date("2023-02-17T23:13:27")
                },
                {
                    //2 and 3 are friends
                    user_id: 2,
                    friend_id: 3,
                    created_at: new Date("2024-01-07T14:37:02")
                },
                {
                    user_id: 3,
                    friend_id: 2,
                    created_at: new Date("2024-01-07T14:37:02")
                }
            ]);
        });
    };