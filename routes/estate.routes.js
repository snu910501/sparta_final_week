const express = require('express');
const router = express.Router();

const EstateController = require("../controllers/estate.controller");

const estateController = new EstateController();

router.post('/', estateController.createEstate)

module.exports = router;