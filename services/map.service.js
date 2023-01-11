const MapRepository = require("../repositories/map.repository");

class MapService {
  mapRepository = new MapRepository();

  getMap = async (neLatLng, swLatLng, zoomLevel) => {
    try {
      //if문과 switch를 비교 했을 경우 if else가 3개이상 넘어가면 switch가 유리하다고 함.
      console.log(neLatLng);
      console.log(swLatLng);
      let reviews;
      if (zoomLevel > 8) {
        const reviews = await this.mapRepository.getMapZoomFive();
        return reviews
      } else if (zoomLevel > 6) {
        const reviews = await this.mapRepository.getMapZoomFour();
        return reviews
      } else if (zoomLevel > 4) {
        const reviews = await this.mapRepository.getMapZoomThree();
        return reviews
      }
      else if (zoomLevel > 2) {
        const reviews = await this.mapRepository.getMapZoomTwo(neLatLng, swLatLng);
        if (zoomLevel == 4) {
          const width = (neLatLng.lng - swLatLng.lng).toFixed(4);
          const height = (neLatLng.lat - swLatLng.lat).toFixed(4);
          const latLength = 0.0022;
          const lngLength = 0.0028;
          console.log(width, height)
          console.log(width / lngLength);
          console.log(height / latLength);

          // for (let i = 0; i < reviews.length; i++) {
          //   width/lngLength
          // }
        } else {

        }
      }
      else {
        const reviews = await this.mapRepository.getMapZoomOne();
        return reviews
      }

    } catch (err) {

    }

  }

}

module.exports = MapService;