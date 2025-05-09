const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // or any port not used by your frontend

app.use(cors());
app.use(bodyParser.json());

let deadline = null; // temporary in-memory storage

// GET endpoint to fetch deadline
app.get('/deadline', (req, res) => {
  res.json({ deadline });
});

// POST endpoint to update deadline
app.post('/deadline', (req, res) => {
  const { newDeadline } = req.body;
  deadline = newDeadline;
  res.status(200).json({ message: 'Deadline updated', deadline });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
