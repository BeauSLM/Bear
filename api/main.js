const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

