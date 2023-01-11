const express = require("express");
const router = express.Router();

const MapController = require("../controllers/map.controller");
const mapController = new MapController();

router.get('/:query', mapController.getMap)

module.exports = router;