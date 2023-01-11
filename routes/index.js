const express = require('express');
const router = express.Router();

const reviewRouter = require('./review.routes');
const searchRouter = require('./search.routes');

router.use('/review', reviewRouter);
router.use('/search', searchRouter);


module.exports = router;