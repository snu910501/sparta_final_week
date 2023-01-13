const Review = require('../models/review');
const EstateInfo = require('../models/estateInfo');
const Estate = require('../models/estate');
const DistrictDo = require("../models/districtDo");
const DistrictCity = require('../models/districtCity');
const DistrictDong = require('../models/districtDong');


// 경기도 전라도 의 도를 Do로 나타냄
// 안산시 서울시 등을 city로 나타냄
class ReviewRepository {
  findEstate = async (address) => {
    try {
      let reviewExist = await Estate.findOne({
        where: {
          address: address,
        },
      });
      return reviewExist;
    } catch (err) {
      console.log('reviewRepository findEstate Error', err);
      throw err;
    }
  };

  createDo = async (doName, LatLng) => {
    try {
      console.log('doname', LatLng);
      const doExist = await DistrictDo.findOne({
        where: {
          doName: doName
        }
      })

      if (!doExist) {
        await DistrictDo.create({
          doName: doName,
          review: 1,
          lat: LatLng.lat,
          lng: LatLng.lng,
        })
      } else {
        await doExist.update({
          review: doExist.review += 1,
        })
      }

    } catch (err) {
      console.log('reviewRepository createDo Error', err);
      throw err;
    }
  }
  createCity = async (cityName, LatLng) => {
    try {
      const cityExist = await DistrictCity.findOne({
        where: {
          cityName: cityName
        }
      })

      if (!cityExist) {
        await DistrictCity.create({
          cityName: cityName,
          review: 1,
          lat: LatLng.lat,
          lng: LatLng.lng,
        })
      } else {
        await cityExist.update({
          review: cityExist.review += 1,
        })
      }
    } catch (err) {
      console.log('reviewRepository createCity Error', err);
      throw err;
    }
  }
  createDong = async (dongName, LatLng) => {
    try {
      const dongExist = await DistrictDong.findOne({
        where: {
          dongName: dongName
        }
      })

      if (!dongExist) {
        await DistrictDong.create({
          dongName: dongName,
          review: 1,
          lat: LatLng.lat,
          lng: LatLng.lng,
        })
      } else {
        await dongExist.update({
          review: dongExist.review += 1,
        })
      }
    } catch (err) {
      console.log('reviewRepository createDong Error', err);
      throw err;
    }
  }

  assignPointDo = async (doName) => {

  }
  assignPointCity = async (cityName) => {

  }
  assignPointDong = async (dongName) => {

  }

  createEstate = async (address, address_jibun, latLng) => {
    try {
      let estate = await Estate.create({
        address: address,
        address_jibun: address_jibun,
        lat: latLng.lat,
        lng: latLng.lng
      });
      return estate;
    } catch (err) {
      console.log('ReviewRepository CreateEstate Error', err);
      throw err;
    }
  };

  // DB를 review와 estateInfo로 분리시켰기 때문에 create를 두번 해야한다.
  // 현재 UserId 부분이 빠져있다.
  createReview = async (
    estateId,
    // nickname,
    good,
    bad,
    star,
    residence_type,
    transaction_type,
    deposit,
    monthly_payment,
    acreage,
    communication,
    bug,
    smell,
    floor_noise,
    walls_noise,
    town_noise,
    mold,
    parking,
    safe,

  ) => {
    let review = await Review.create(
      {
        estateId,
        // nickname,
        good,
        bad,
        star,
        residence_type,
        transaction_type,
        deposit,
        monthly_payment,
        acreage,
      }
    );
    let estateInfo = await EstateInfo.create(
      {
        reviewId: review.reviewId,
        estateId,
        communication,
        bug,
        smell,
        floor_noise,
        walls_noise,
        town_noise,
        mold,
        parking,
        safe,
      }
    )
    return { review, estateInfo }
  };
}

module.exports = ReviewRepository;
