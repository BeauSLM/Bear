exports.seed = function (knex, Promise) {
    return knex("login")
        .truncate()
        .then(function () {
            return knex("login").insert([
                {
                    user_id: 1,
                    passwordHash: "$2b$10$Z3qLjd5YJEmpZwbsSrtXH.V90iNde.mia6eVHgzVq//DYR3sOs2ZS", // abc123
                },
                {
                    user_id: 2,
                    passwordHash: "$2b$10$4Kv7n8EybAid5MB0OSSRcOyMeXHR0BNWPO.2tczhSDjfTk8ceXsiq", // doremiabc
                },
            ]);
        });
};
