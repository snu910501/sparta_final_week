
const MapRepository = require("../repositories/map.repository");

class MapService {
  mapRepository = new MapRepository();

  getMap = async (neLatLng, swLatLng, zoomLevel) => {
    try {
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
        let arr = [];
        if (zoomLevel == 4) {
          try {
            const reviews = await this.mapRepository.getMapZoomTwo(neLatLng, swLatLng, 4);

            for (let i = 0; i < reviews.length; i++) {
              let num = 0;
              if (i == 0) {
                arr[0] = [];
                arr[0].push(reviews[i])

              } else {
                for (let a = 0; a < arr.length; a++) {
                  if (arr[a][0].lat == reviews[i].lat && arr[a][0].lng == reviews[i].lng) {
                    arr[a].push(reviews[i]);
                  } else {
                    num++;
                  }
                }
                if (num == arr.length) {
                  arr[num] = [];
                  arr[num].push(reviews[i]);
                }
              }
            }
            return arr;
          } catch (err) {
            console.log('MapService get Map zoom level 4 Error', err);
          }

        } else {
          try {
            const reviews = await this.mapRepository.getMapZoomTwo(neLatLng, swLatLng, 3);

            for (let i = 0; i < reviews.length; i++) {
              let num = 0;
              if (i == 0) {
                arr[0] = [];
                arr[0].push(reviews[i])

              } else {
                for (let a = 0; a < arr.length; a++) {
                  if (arr[a][0].lat == reviews[i].lat && arr[a][0].lng == reviews[i].lng) {
                    arr[a].push(reviews[i]);
                  } else {
                    num++;
                  }
                }
                if (num == arr.length) {
                  arr[num] = [];
                  arr[num].push(reviews[i]);
                }
              }
            }
            return arr;
          } catch (err) {
            console.log('MapService get Map zoom level 4 Error', err);
          }

        }
      }
      else if (zoomLevel > 0) {
        const reviews = await this.mapRepository.getMapZoomOne(neLatLng, swLatLng);
        return reviews
      } else {
        return;
      }

    } catch (err) {

    }

  }

}

module.exports = MapService;