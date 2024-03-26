exports.seed = function (knex, Promise) {
    return knex("login")
        .del()
        .then(function () {
            return knex("login").insert([
                {
                    //pick a card any card! the two of wives? forsenCD
                    passwordSalt: "$2b$11$oR9hnQc11ZKeTU2ARacPCu",
                    passwordHash:"$2b$11$oR9hnQc11ZKeTU2ARacPCu9p12Uy/zTqDdJzD8uZVeFxF80yf2yJi",
                },
                {
                    // UNBENCH THE KENCH OSFrog PERMIT THE KERMIT OSFrog DEFOG THE POLLIWOG OSFrog
                    passwordSalt: "2b$11$5rR4FKNxgiZCJZqB34uayO",
                    passwordHash:"$2b$11$5rR4FKNxgiZCJZqB34uayOQ0qXWwvtSUcQpkpi8tWAtlDfVnY0XRK",
                }

            ]);
        });
};