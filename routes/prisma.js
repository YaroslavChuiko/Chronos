const express = require('express');
const prisma = require('~/lib/prisma');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts)
})

module.exports = router;