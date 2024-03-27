exports.seed = function (knex, Promise) {
    return knex("message")
        .truncate()
        .then(function () {
            return knex("message").insert([
                {
                    id: 1,
                    chat_id: 1,
                    sender_id: 2,
                    text: "Let's go!",
                    sent_timestamp: new Date('2023-04-20T03:24:00'),
                    read_timestamp: new Date('2023-04-20T10:59:20'),
                },
                {
                    id: 3,
                    chat_id: 1,
                    sender_id: 2,
                    text: "Are you ready?",
                    sent_timestamp: new Date('2023-04-20T03:25:15'),
                    read_timestamp: new Date('2023-04-20T10:59:20'),
                },
                {
                    id: 2,
                    chat_id: 2,
                    sender_id: 3,
                    text: "Hi!",
                    sent_timestamp: new Date('2024-10-01T03:24:00'),
                }

            ]);
        });
};