const express = require('express');
const router = express.Router();

const estateRouter = require('./estate.routes');

router.use('/estate', estateRouter)


module.exports = router;