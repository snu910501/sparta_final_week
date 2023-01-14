const express = require('express');
const router = express.Router();

const socialRouter = require('./social.route');
const postsRouter = require('./posts.route');
const commentsRouter = require('./comments.route');

router.use('/social', socialRouter);
router.use('/posts', postsRouter);
router.use('/', commentsRouter);

module.exports = router;
