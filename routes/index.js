const express = require('express');
const router = express.Router();
const postsRouter = require('./posts.route');
const commentsRouter = require('./comments.route');

router.use('/posts', postsRouter);
router.use('/', commentsRouter);

module.exports = router;
