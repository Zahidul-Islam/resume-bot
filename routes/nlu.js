const express = require('express');
const router = express.Router();
const Conversations = require('../models/conversations');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/query/:text', async (req, res) => {
  const name = req.params.text.trim();
  const conversation = await Conversations.findOne({ name });
  res.json(conversation);
});

module.exports = router;
