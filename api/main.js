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

// community_section
// Read all community_section entries
app.get('/community_section', async (req, res) => {
  try {
    const communitySections = await db.select().from('community_section');
    res.json(communitySections);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Community Sections');
  }
});

// Read a specific community_section entry
app.get('/community_section/:communityId/:sectionName', async (req, res) => {
  const { communityId, sectionName } = req.params;
  
  try {
    const communitySection = await db
      .select()
      .from('community_section')
      .where({ community_id: communityId, section_name: sectionName })
      .first(); // Assuming only one result is expected
    
    if (communitySection) {
      res.json(communitySection);
    } else {
      res.status(404).send('Community Section not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Community Section');
  }
});

// Create a new community_section entry
app.post('/community_section', async (req, res) => {
  const newCommunitySection = req.body;
  
  try {
    await db('community_section').insert(newCommunitySection);
    res.send('Community Section created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Community Section');
  }
});

// Update a specific community_section entry
app.put('/community_section/:communityId/:sectionName', async (req, res) => {
  const { communityId, sectionName } = req.params;
  const updatedCommunitySection = req.body;
  
  try {
    await db('community_section')
      .where({ community_id: communityId, section_name: sectionName })
      .update(updatedCommunitySection);
    
    res.send('Community Section updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating Community Section');
  }
});

// Delete a specific community_section entry
app.delete('/community_section/:communityId/:sectionName', async (req, res) => {
  const { communityId, sectionName } = req.params;
  
  try {
    await db('community_section')
      .where({ community_id: communityId, section_name: sectionName })
      .del();
    
    res.send('Community Section deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting Community Section');
  }
});

// community_page
// Read all community_page entries
app.get('/community_page', async (req, res) => {
  try {
    const communityPages = await db.select().from('community_page');
    res.json(communityPages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Community Pages');
  }
});

// Read a specific community_page entry
app.get('/community_page/:communityId/:pageName', async (req, res) => {
  const { communityId, pageName } = req.params;
  
  try {
    const communityPage = await db
      .select()
      .from('community_page')
      .where({ community_id: communityId, page_name: pageName })
      .first(); // Assuming only one result is expected
    
    if (communityPage) {
      res.json(communityPage);
    } else {
      res.status(404).send('Community Page not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Community Page');
  }
});

// Create a new community_page entry
app.post('/community_page', async (req, res) => {
  const newCommunityPage = req.body;
  
  try {
    await db('community_page').insert(newCommunityPage);
    res.send('Community Page created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Community Page');
  }
});

// Update a specific community_page entry
app.put('/community_page/:communityId/:pageName', async (req, res) => {
  const { communityId, pageName } = req.params;
  const updatedCommunityPage = req.body;
  
  try {
    await db('community_page')
      .where({ community_id: communityId, page_name: pageName })
      .update(updatedCommunityPage);
    
    res.send('Community Page updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating Community Page');
  }
});

// Delete a specific community_page entry
app.delete('/community_page/:communityId/:pageName', async (req, res) => {
  const { communityId, pageName } = req.params;
  
  try {
    await db('community_page')
      .where({ community_id: communityId, page_name: pageName })
      .del();
    
    res.send('Community Page deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting Community Page');
  }
});

// community 
// Read all community entries
app.get('/community', async (req, res) => {
  try {
    const communities = await db.select().from('community');
    res.json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Communities');
  }
});

// Read a specific community entry
app.get('/community/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const community = await db
      .select()
      .from('community')
      .where({ id: id })
      .first(); // Assuming only one result is expected
    
    if (community) {
      res.json(community);
    } else {
      res.status(404).send('Community not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Community');
  }
});

// Create a new community entry
app.post('/community', async (req, res) => {
  const newCommunity = req.body;
  
  try {
    await db('community').insert(newCommunity);
    res.send('Community created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Community');
  }
});

// Update a specific community entry
app.put('/community/:id', async (req, res) => {
  const { id } = req.params;
  const updatedCommunity = req.body;
  
  try {
    await db('community')
      .where({ id: id })
      .update(updatedCommunity);
    
    res.send('Community updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating Community');
  }
});

// Delete a specific community entry
app.delete('/community/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await db('community')
      .where({ id: id })
      .del();
    
    res.send('Community deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting Community');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.get('/test', (req, res) => {

//   res.send('Hello, World!');
// });
