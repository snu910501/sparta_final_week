const MapRepository = require("../repositories/map.repository");

class MapService {
  mapRepository = new MapRepository();

  getMap = async (neLatLng, swLatLng, zoomLevel) => {
    try {
      //if문과 switch를 비교 했을 경우 if else가 3개이상 넘어가면 switch가 유리하다고 함.

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
          try {
            const width = (neLatLng.lng - swLatLng.lng).toFixed(4);
            const height = (neLatLng.lat - swLatLng.lat).toFixed(4);
            const latLength = 0.0040;
            const lngLength = 0.0056;

            // 2차원 배열 생성 줌 래밸 축적에 맞춰 가로 20 세로 15
            const ROW = parseInt(width / lngLength); //가로
            const COLUMN = parseInt(height / latLength); //세로

            // 2차원 배열 선언 이제 여기다가 매물들 매핑할거임
            let arr = new Array(ROW);
            for (let i = 0; i < arr.length; i++) {
              arr[i] = new Array(COLUMN);
            }


            // 좌표값에 따라 배열에 저장함
            for (let i = 0; i < reviews.length; i++) {
              const width = parseInt((reviews[i].lng - swLatLng.lng) / lngLength) - 1;
              const height = parseInt((reviews[i].lat - swLatLng.lat) / latLength) - 1;

              if (typeof arr[width][height] !== 'object') {
                arr[width][height] = [];
                arr[width][height].push(reviews[i].dataValues)
              } else {
                arr[width][height].push(reviews[i].dataValues)
              }

            }

            // 값이 있는 배열들만 프론트에 전달하려고 함
            let data = []
            for (let i = 0; i < ROW; i++) {
              for (let a = 0; a < COLUMN; a++) {
                if (arr[i][a] != undefined) {
                  data.push(arr[i][a])
                }
              }
            }
            return data
          } catch (err) {
            console.log('MapService get Map zoom level 4 Error', err);
          }

        } else {
          try {
            const width = (neLatLng.lng - swLatLng.lng).toFixed(4);
            const height = (neLatLng.lat - swLatLng.lat).toFixed(4);
            const latLength = 0.0005;
            const lngLength = 0.0007;

            // 2차원 배열 생성 줌 래밸 축적에 맞춰 가로 20 세로 15
            const ROW = parseInt(width / lngLength); //가로
            const COLUMN = parseInt(height / latLength); //세로

            // 2차원 배열 선언 이제 여기다가 매물들 매핑할거임
            let arr = new Array(ROW);
            for (let i = 0; i < arr.length; i++) {
              arr[i] = new Array(COLUMN);
            }

            for (let i = 0; i < reviews.length; i++) {
              const width = parseInt((reviews[i].lng - swLatLng.lng) / lngLength) - 1;
              const height = parseInt((reviews[i].lat - swLatLng.lat) / latLength) - 1;

              if (typeof arr[width][height] !== 'object') {
                arr[width][height] = [];
                arr[width][height].push(reviews[i].dataValues)
              } else {
                arr[width][height].push(reviews[i].dataValues)
              }

            }
            console.log(arr)

          } catch (err) {
            console.log('MapService get Map zoom level 3 Error', err);
          }

        }
      }
      else {
        const reviews = await this.mapRepository.getMapZoomOne(neLatLng, swLatLng);
        return reviews
      }

    } catch (err) {

    }

  }

}

module.exports = MapService;