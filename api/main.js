const express = require('express');
const knexConfig = require('./db/knexfile');

// Initializes knex based of the current environment variable
const db = require('knex')(knexConfig);

const app = express();

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from api!');
});

app.get('/users', async (req, res) => {
  const users = await db.select().from('users');
  res.json(users);
});

// community_mod stuff
app.get('/community_mod', async (req, res) => {
  const communityMod = await db.select().from('community_mod');
  res.json(communityMod);
});

app.get('/community_mod/:communityId/:userId', async (req, res) => {
  const { communityId, userId } = req.params;
  
  try {
    const communityMod = await db
      .select()
      .from('community_mod')
      .where({ community_id: communityId, user_id: userId })
      .first(); // Assuming only one result is expected
    
    if (communityMod) {
      res.json(communityMod);
    } else {
      res.status(404).send('Community Mod not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Community Mod');
  }
});

app.post('/community_mod', async (req, res) => {
  const newCommunityMod = req.body;
  await db('community_mod').insert(newCommunityMod);
  res.send('Community Mod created successfully');
});

app.delete('/community_mod/:communityId/:userId', async (req, res) => {
  const { communityId, userId } = req.params;
  try{
    await db('community_mod').where({ community_id: communityId, user_id: userId }).del();

    res.send('Community Mod deleted successfully');
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error deleting community mod');
  }
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.get('/test', (req, res) => {

//   res.send('Hello, World!');
// });
