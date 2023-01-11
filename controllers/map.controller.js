const MapService = require('../services/map.service');

class MapController {
  mapService = new MapService();
  getMap = async (req, res) => {
    const query = req.params.query
  }
}

module.exports = MapController;