exports.seed = function (knex, Promise) {
    return knex("community")
        .truncate()
        .then(function () {
            return knex("community").insert([
                {
                    name: "Cool Guys w/ Cars",
                    tagline: "Zoom zoom!",
                    description:
                        "Discuss your favorite cars with your silly car geeks!",
                },
                {
                    name: "BTD6 Comp. Chat",
                    tagline: "Tower defense is rad!",
                    description:
                        "A place to find, share, and engage with a community of like-minded individuals!",
                },
                {
                    name: "Pick-Up 52 Enthusiasts",
                    tagline: "How do you play?",
                    description:
                        "Share your favorite Pick-Up 52 stories with your friends online!",
                },
            ]);
        });
};
