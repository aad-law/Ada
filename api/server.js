const express = require('express');
const AdaBrain = require('../src/adaBrain');

const app = express();
app.use(express.json());

const ada = new AdaBrain();

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await ada.process(message);
  res.json({ response });
});

app.listen(3000, () => {
  console.log('Ada API running on http://localhost:3000');
});