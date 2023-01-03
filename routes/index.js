const express = require('express');
const router = express.Router();

const reviewRouter = require('./review.routes');

router.use('/review', reviewRouter)


module.exports = router;