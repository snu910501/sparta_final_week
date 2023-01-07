const express = require('express');
const router = express.Router();
const postsRouter = require('./posts.route');
const commentsRouter = require('./comments.route');

const reviewRouter = require('./review.routes');

router.use('/review', reviewRouter);

module.exports = router;
