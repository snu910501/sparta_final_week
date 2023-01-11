const express = require('express');
const router = express.Router();

const reviewRouter = require('./review.routes');
const searchRouter = require('./search.routes');
const mapRouter = require('./map.routes')

router.use('/review', reviewRouter);
router.use('/search', searchRouter);
router.use('/map', mapRouter);


module.exports = router;