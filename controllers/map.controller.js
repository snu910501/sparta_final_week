const MapService = require('../services/map.service');

class MapController {
  mapService = new MapService();
  getMap = async (req, res) => {
    try {
      const { neLatLng, swLatLng, zoomLevel } = req.body
      console.log('req.body', neLatLng, swLatLng, zoomLevel);
      let reviews = await this.mapService.getMap(neLatLng, swLatLng, zoomLevel);
      return res.status(200).json({ data: reviews })
    } catch (err) {
      console.log('MapController getMap Error', err);
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage })
      } else {
        return res.status(500).json({ errorMessage: 'error' })
      }
    }

  }
}

module.exports = MapController;