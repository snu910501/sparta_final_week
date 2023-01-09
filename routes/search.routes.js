const express = require('express');
const router = express.Router();

const searchValidate = require('../middlewares/searchValidate');
const SearchController = require("../controllers/search.controller");
const searchController = new SearchController();


router.post('/', searchValidate, searchController.assignPointWord)
router.get('/:text', searchValidate, searchController.search)

module.exports = router