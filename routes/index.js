const express = require('express');
const router = express.Router();

const reviewRouter = require('./review.routes');
const authRouter = require('./auth.routes');

router.use('/review', reviewRouter)
router.use('/auth', authRouter);


module.exports = router;