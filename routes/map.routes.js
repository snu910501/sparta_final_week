const express = require("express");
const router = express.Router();

const MapController = require("../controllers/map.controller");
const mapController = new MapController();

router.post('/', mapController.getMap)

module.exports = router;