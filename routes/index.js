const express = require('express');
const router = express.Router();

const reviewRouter = require('./review.routes');
const searchRouter = require('./search.routes');
const mapRouter = require('./map.routes')
const socialRouter = require('./social.route');
const postsRouter = require('./posts.route');
const commentsRouter = require('./comments.route');

router.use('/auth', socialRouter);
router.use('/posts', postsRouter);
router.use('/', commentsRouter);
router.use('/review', reviewRouter);
router.use('/search', searchRouter);
router.use('/map', mapRouter);


module.exports = router;
