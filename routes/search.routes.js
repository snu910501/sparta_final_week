const express = require('express');
const router = express.Router();

const SearchController = require("../controllers/search.controller");
const searchController = new SearchController();

router.get('/:text', searchController.search)

module.exports = router