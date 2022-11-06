const express = require("express");
const example = require('~/routes/prisma');

const router = express.Router();

router.use("/prisma", example);

module.exports = router;