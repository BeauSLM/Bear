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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.get('/test', (req, res) => {

//   res.send('Hello, World!');
// });
