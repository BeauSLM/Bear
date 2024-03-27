
exports.seed = function (knex, Promise) {
    return knex("chat_notification")
        .truncate()
        .then(function () {
            return knex("chat_notification").insert([
                {
                    id:2,
                    recipient_id: 1,
                    message_id: 2,
                    is_seen: false
                },
            ]);
        });
};
