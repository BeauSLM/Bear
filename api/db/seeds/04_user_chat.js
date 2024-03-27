exports.seed = function (knex, Promise) {
    return knex("user_chat")
        .truncate()
        .then(function () {
            return knex("user_chat").insert([
                {
                    // chat between friends
                    chat_id: 1,
                    member_id: 1
                },
                {
                    chat_id: 1,
                    member_id: 2
                },
                {
                    // chat between non friends
                    chat_id: 2,
                    member_id: 1
                },
                {
                    chat_id: 2,
                    member_id: 3
                },
            ]);
        });
};
