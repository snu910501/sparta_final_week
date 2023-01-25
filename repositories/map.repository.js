const Estate = require("../models/estate");
const DistrictDo = require('../models/districtDo');
const DistrictCity = require('../models/districtCity');
const DistrictDong = require('../models/districtDong');
const ZoomLevelFour = require("../models/zoomLevelFour");
const ZoomLevelThree = require('../models/zoomLevelThree');
const { Op } = require('sequelize');

class MapRepository {
  getMapZoomFive = async () => {
    try {
      const reviews = await DistrictDo.findAll({
        attributes: [
          "review",
          "doName",
          "lat",
          "lng"
        ]
      });
      return reviews;
    } catch (err) {
      console.log('mapRepository getMapZoomFive Error', err);
      throw err;
    }

  };
  getMapZoomFour = async () => {
    try {
      const reviews = await DistrictCity.findAll({
        attributes: [
          "review",
          "cityName",
          "lat",
          "lng"
        ]
      });
      return reviews;
    } catch (err) {
      console.log('mapRepository getMapZoomFour Error', err);
      throw err;
    }
  };
  getMapZoomThree = async () => {
    try {
      const reviews = await DistrictDong.findAll({
        attributes: [
          "review",
          "dongName",
          "lat",
          "lng"
        ]
      });
      return reviews;
    } catch (err) {
      console.log('mapRepository getMapZoomThree Error', err);
      throw err;
    }
  };
  getMapZoomTwo = async (neLatLng, swLatLng, number) => {
    try {

      if (number == 4) {
        let reviewsArr = []
        const reviews = await ZoomLevelFour.findAll({
          where: {
            lat: { [Op.between]: [swLatLng.lat, neLatLng.lat] },
            lng: { [Op.between]: [swLatLng.lng, neLatLng.lng] }
          },
          attributes: [
            'estateId',
            'lat',
            'lng',
          ]
        })
        for (let i = 0; i < reviews.length; i++) {
          reviewsArr.push(reviews[i].dataValues);
        }
        return reviewsArr
      } else {
        let reviewsArr = []
        const reviews = await ZoomLevelThree.findAll({
          where: {
            lat: { [Op.between]: [swLatLng.lat, neLatLng.lat] },
            lng: { [Op.between]: [swLatLng.lng, neLatLng.lng] }
          },
          attributes: [
            'estateId',
            'lat',
            'lng',
          ]
        })
        for (let i = 0; i < reviews.length; i++) {
          reviewsArr.push(reviews[i].dataValues);
        }
        return reviewsArr
      }
    } catch (err) {
      console.log('mapRepository getMapZoomTwo Error', err);
      throw err;
    }
  };
  getMapZoomOne = async (neLatLng, swLatLng) => {
    try {
      const reviews = await Estate.findAll({
        where: {
          lat: { [Op.between]: [swLatLng.lat, neLatLng.lat] },
          lng: { [Op.between]: [swLatLng.lng, neLatLng.lng] }
        },
        attributes: [
          "estateId",
          "lat",
          "lng"
        ]
      })
      reviews.map((data) => {
        return data.dataValues
      })
      return reviews
    } catch (err) {
      console.log('mapRepository getMapZoomOne Error', err);
      throw err;
    }
  }
}

module.exports = MapRepository;