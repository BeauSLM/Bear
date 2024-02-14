require('dotenv').config();

const express = require('express');
const environment = process.env.NODE_ENV;
const knexConfig = require('./db/knexfile')[environment];

// Initializes knex based of the current environment variable
const db = require('knex')(knexConfig);

const app = express();


const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from api!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.get('/test', (req, res) => {

//   res.send('Hello, World!');
// });
