const express = require("express");
const knexConfig = require("./db/knexfile");
const bcrypt = require('bcrypt');

// Initializes knex based of the current environment variable
const db = require("knex")(knexConfig);

const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());


// community_mod stuff
app.get("/community_mod", async (req, res) => {
    try {
        const communityMod = await db.select().from("community_mod");
        res.json(communityMod);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching community mods");
    }
});

app.get("/community_mod/:communityId/:userId", async (req, res) => {
    const { communityId, userId } = req.params;

    try {
        const communityMod = await db
            .select()
            .from("community_mod")
            .where({ community_id: communityId, user_id: userId })
            .first(); // Assuming only one result is expected

        if (communityMod) {
            res.json(communityMod);
        } else {
            res.status(404).send("Community Mod not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Community Mod");
    }
});

app.post("/community_mod", async (req, res) => {
    const newCommunityMod = req.body;
    try {
        await db("community_mod").insert(newCommunityMod);
        res.send("Community Mod created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error posting community mod");
    }
});

app.delete("/community_mod/:communityId/:userId", async (req, res) => {
    const { communityId, userId } = req.params;
    try {
        await db("community_mod")
            .where({ community_id: communityId, user_id: userId })
            .del();

        res.send("Community Mod deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting community mod");
    }
});

// community_section
// Read all community_section entries
app.get("/community_section", async (req, res) => {
    try {
        const communitySections = await db.select().from("community_section");
        res.json(communitySections);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Community Sections");
    }
});

// read community_section (not just one result) from community id
app.get("/community_section/:communityId", async (req, res) => {
    const { communityId } = req.params;

    try {
        const communitySections = await db
            .select()
            .from("community_section")
            .where({ community_id: communityId });

        if (communitySections) {
            res.json(communitySections);
        } else {
            res.status(404).send("Community Sections not found:105");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Community Section");
    }
});

// Read a specific community_section entry
app.get("/community_section/:communityId/:sectionId", async (req, res) => {
    const { communityId, sectionId } = req.params;

    try {
        const communitySection = await db
            .select()
            .from("community_section")
            .where({ community_id: communityId, section_id: sectionId })
            .first(); // Assuming only one result is expected

        if (communitySection) {
            res.json(communitySection);
        } else {
            res.status(404).send("Community Section not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Community Section");
    }
});

// Create a new community_section entry
app.post("/community_section", async (req, res) => {
    const newCommunitySection = req.body;

    try {
        await db("community_section").insert(newCommunitySection);
        res.send("Community Section created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating Community Section");
    }
});

// Update a specific community_section entry
app.put("/community_section/:communityId/:sectionId", async (req, res) => {
    const { communityId, sectionId } = req.params;
    const updatedCommunitySection = req.body;

    try {
        await db("community_section")
            .where({ community_id: communityId, section_id: sectionId })
            .update(updatedCommunitySection);

        res.send("Community Section updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating Community Section");
    }
});

// community_page
// Read all community_page entries
app.get("/community_page", async (req, res) => {
    try {
        const communityPages = await db.select().from("community_page");
        res.json(communityPages);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Community Pages");
    }
});

// Read a specific community_page entry
app.get("/community_page/:communityId/:pageId", async (req, res) => {
    const { communityId, pageId } = req.params;

    try {
        const communityPage = await db
            .select()
            .from("community_page")
            .where({ community_id: communityId, page_id: pageId })
            .first(); // Assuming only one result is expected

        if (communityPage) {
            res.json(communityPage);
        } else {
            res.status(404).send("Community Page not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Community Page");
    }
});

// Create a new community_page entry
app.post("/community_page", async (req, res) => {
    const newCommunityPage = req.body;

    try {
        await db("community_page").insert(newCommunityPage);
        res.send("Community Page created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating Community Page");
    }
});

// Update a specific community_page entry
app.put("/community_page/:communityId/:pageId", async (req, res) => {
    const { communityId, pageId } = req.params;
    const updatedCommunityPage = req.body;

    try {
        await db("community_page")
            .where({ community_id: communityId, page_id: pageId })
            .update(updatedCommunityPage);

        res.send("Community Page updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating Community Page");
    }
});

// Delete a specific community_page entry
app.delete("/community_page/:communityId/:pageId", async (req, res) => {
    const { communityId, pageId } = req.params;

    try {
        await db("community_page")
            .where({ community_id: communityId, page_id: pageId })
            .del();

        res.send("Community Page deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting Community Page");
    }
});

// community
// Read all community entries
app.get("/community", async (req, res) => {
    try {
        const communities = await db.select().from("community");
        res.json(communities);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Communities");
    }
});

// Read a specific community entry
app.get("/community/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const community = await db
            .select()
            .from("community")
            .where({ id: id })
            .first(); // Assuming only one result is expected

        if (community) {
            res.json(community);
        } else {
            res.status(404).send("Community not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching Community");
    }
});

// Create a new community entry
app.post("/community", async (req, res) => {
    const newCommunity = req.body;

    try {
        await db("community").insert(newCommunity);
        res.send("Community created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating Community");
    }
});

// Update a specific community entry
app.put("/community/:id", async (req, res) => {
    const { id } = req.params;
    const updatedCommunity = req.body;

    try {
        await db("community").where({ id: id }).update(updatedCommunity);

        res.send("Community updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating Community");
    }
});

// Delete a specific community entry
app.delete("/community/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db("community").where({ id: id }).del();

        res.send("Community deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting Community");
    }
});

// Create a new login entry
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = {
            name: username
        }

        const [userId] = await db("user").insert(newUser);

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newLogin = {
                user_id: userId,
                passwordHash: hashedPassword
            };

            await db("login").insert(newLogin);
            res.json({ user_id: userId });
        } catch (bcryptError) {
            console.error("Error hashing password:", bcryptError);
            res.status(500).send("Error hashing password");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating login entry");
    }
});

// validate login, take in username & password. 
app.post("/validateLogin", async (req, res) => {
    const loginInfo = req.body;

    try {
        const userID = (await db("user").select('id').where( 'name', loginInfo.username ).first());

        if (!userID) {
            return res.status(400).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const loginHash = (await db('login').select('passwordHash').where('user_id', userID.id).first()).passwordHash;
        const passwordMatch = await bcrypt.compare(loginInfo.password, loginHash);

        if (!passwordMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Incorrect password'
            });
        }

        // If password matches, return the user_id
        res.json({ user_id: userID.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error validating login");
    }
});

// reply_like
// Read all reply_like entries
app.get("/reply_like", async (req, res) => {
    try {
        const replyLikes = await db.select().from("reply_like");
        res.json(replyLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching reply_like entries");
    }
});

// Read a specific reply_like entry by thread_id, reply_id, and user_id
app.get("/reply_like/:threadId/:replyId/:userId", async (req, res) => {
    const { threadId, replyId, userId } = req.params;

    try {
        const replyLike = await db
            .select()
            .from("reply_like")
            .where({ thread_id: threadId, reply_id: replyId, user_id: userId })
            .first(); // Assuming only one result is expected

        if (replyLike) {
            res.json(replyLike);
        } else {
            res.status(404).send("Reply Like entry not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching reply_like entry");
    }
});

app.get("/reply_like/:threadId/:replyId", async (req, res) => {
    const { threadId, replyId, userId } = req.params;

    try {
        const replyLike = await db
            .select()
            .from("reply_like")
            .where({ thread_id: threadId, reply_id: replyId })
            .first(); // Assuming only one result is expected

        if (replyLike) {
            res.json(replyLike);
        } else {
            res.status(404).send("Reply Like entry not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching reply_like entry");
    }
});

// Create a new reply_like entry
app.post("/reply_like", async (req, res) => {
    const newReplyLike = req.body;

    try {
        await db("reply_like").insert(newReplyLike);
        res.send("Reply Like entry created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating reply_like entry");
    }
});

// Delete a specific reply_like entry by thread_id, reply_id, and user_id
app.delete("/reply_like/:threadId/:replyId/:userId", async (req, res) => {
    const { threadId, replyId, userId } = req.params;

    try {
        await db("reply_like")
            .where({ thread_id: threadId, reply_id: replyId, user_id: userId })
            .del();

        res.send("Reply Like entry deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting reply_like entry");
    }
});

// reply

// Read all replies
app.get("/reply", async (req, res) => {
    try {
        const replies = await db.select().from("reply");
        res.json(replies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching replies");
    }
});

// get all replies for a threadId
app.get("/reply/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try{
        const replies = await db.select().from("reply").where({ thread_id: threadId })

        res.json(replies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching replies by threadId");
    }
});

// Read a specific reply by thread_id and reply_id
app.get("/reply/:threadId/:replyId", async (req, res) => {
    const { threadId, replyId } = req.params;

    try {
        const reply = await db
            .select()
            .from("reply")
            .where({ thread_id: threadId, reply_id: replyId })
            .first(); // Assuming only one result is expected

        if (reply) {
            res.json(reply);
        } else {
            res.status(404).send("Reply not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching reply");
    }
});

app.get("/reply/:threadId", async (req, res) => {
    const { threadId, replyId } = req.params;

    try {
        const reply = await db
            .select()
            .from("reply")
            .where({ thread_id: threadId })

        if (reply) {
            res.json(reply);
        } else {
            res.status(404).send("Reply not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching reply");
    }
});

// Create a new reply
app.post("/reply", async (req, res) => {
    const newReply = req.body;

    try {
        await db.transaction(async (trx) => {
            await trx("reply").insert(newReply);
            const threadId = newReply.thread_id;
            const thread = await trx("thread").where({ thread_id: threadId }).first();
            const sectionId = thread.section_id;
            await trx("community_section")
                .where({ section_id: sectionId })
                .update({ last_active: db.raw('CURRENT_TIMESTAMP') });
        });

        res.send("Reply created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating reply");
    }
});

// Update a specific reply by thread_id and reply_id
app.put("/reply/:threadId/:replyId", async (req, res) => {
    const { threadId, replyId } = req.params;
    const updatedReply = req.body;

    try {
        await db("reply")
            .where({ thread_id: threadId, reply_id: replyId })
            .update(updatedReply);

        res.send("Reply updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating reply");
    }
});

// thread_like

// Read all thread_like entries
app.get("/thread_like", async (req, res) => {
    try {
        const threadLikes = await db.select().from("thread_like");
        res.json(threadLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching thread_like entries");
    }
});

// Read thread_like entries for a specific thread_id
app.get("/thread_like/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const threadLikes = await db
            .select()
            .from("thread_like")
            .where({ thread_id: threadId });

        res.json(threadLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching thread_like entries");
    }
});

// Create a new thread_like entry
app.post("/thread_like", async (req, res) => {
    const newThreadLike = req.body;

    try {
        await db("thread_like").insert(newThreadLike);
        res.send("Thread Like entry created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating thread_like entry");
    }
});

// Delete thread_like entries for a specific thread_id and user_id
app.delete("/thread_like/:threadId/:userId", async (req, res) => {
    const { threadId, userId } = req.params;

    try {
        await db("thread_like")
            .where({ thread_id: threadId, user_id: userId })
            .del();

        res.send("Thread Like entries deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting thread_like entries");
    }
});

// thread

// Read all threads
app.get("/thread", async (req, res) => {
    try {
        const threads = await db.select().from("thread");
        res.json(threads);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching threads");
    }
});

// Read a specific thread by thread_id
app.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await db
            .select()
            .from("thread")
            .where({ thread_id: threadId })
            .first(); // Assuming only one result is expected

        if (thread) {
            res.json(thread);
        } else {
            res.status(404).send("Thread not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching thread");
    }
});

// Create a new thread
app.post("/thread", async (req, res) => {
    const newThread = req.body;

    try {
        await db.transaction(async (trx) => {
            await trx("thread").insert(newThread);
            await trx("community_section")
                .where({ section_id: newThread.section_id })
                .update({ last_active: db.raw('CURRENT_TIMESTAMP') });
        });
        res.send("Thread created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating thread");
    }
});

// 
// Update a specific thread by thread_id
app.put("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    const updatedThread = req.body;

    try {
        await db.transaction(async (trx) => {
            await trx("thread").where({ thread_id: threadId }).update(updatedThread);
            const thread = await trx("thread").where({ thread_id: threadId }).first();
            const sectionId = thread.section_id;
            await trx("community_section")
                .where({ section_id: sectionId })
                .update({ last_active: db.raw('CURRENT_TIMESTAMP') });
        });

        res.send("Thread updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating thread");
    }
});

// user_subscription
// Read all user_subscription entries
app.get("/user_subscription", async (req, res) => {
    try {
        const userSubscriptions = await db.select().from("user_subscription");
        res.json(userSubscriptions);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user_subscription entries");
    }
});

// Read user_subscription entries for a specific user_id
app.get("/user_subscription/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const userSubscriptions = await db
            .select()
            .from("user_subscription")
            .where({ user_id: userId });

        res.json(userSubscriptions);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user_subscription entries");
    }
});

// Create a new user_subscription entry
app.post("/user_subscription", async (req, res) => {
    const newUserSubscription = req.body;

    try {
        await db("user_subscription").insert(newUserSubscription);
        res.send("User Subscription entry created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user_subscription entry");
    }
});

// Delete user_subscription entries for a specific user_id, community_id, and section
app.delete(
    "/user_subscription/:userId/:communityId/:section_id",
    async (req, res) => {
        const { userId, communityId, section_id } = req.params;

        try {
            await db("user_subscription")
                .where({
                    user_id: userId,
                    community_id: communityId,
                    section_id: section_id,
                })
                .del();

            res.send("User Subscription entries deleted successfully");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error deleting user_subscription entries");
        }
    },
);

// user
// Read all user entries
app.get("/user", async (req, res) => {
    try {
        const users = await db.select().from("user");
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user entries");
    }
});

// Read a specific user entry by id
app.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await db
            .select()
            .from("user")
            .where({ id: userId })
            .first(); // Assuming only one result is expected

        if (user) {
            res.json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user entry");
    }
});

// Update a specific user entry by id
app.put("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const updatedUser = req.body;

    try {
        await db("user").where({ id: userId }).update(updatedUser);

        res.send("User entry updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user entry");
    }
});

// Delete a specific user entry by id
app.delete("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        await db("user").where({ id: userId }).del();

        res.send("User entry deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user entry");
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
