const Review = require('../models/review');
const EstateInfo = require('../models/estateInfo');
const Estate = require('../models/estate');
const DistrictDo = require("../models/districtDo");
const DistrictCity = require('../models/districtCity');
const DistrictDong = require('../models/districtDong');
const ReviewImage = require('../models/reviewImage');
const ZoomLevelFour = require("../models/zoomLevelFour");
const ZoomLevelThree = require('../models/zoomLevelThree');

const error = require('../modules/error');


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
      if (doName == '서울') {
        doName = '서울특별시';
      } else if (doName == '경기') {
        doName = '경기도';
      }
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

  createEstate = async (address, address_jibun, latLng) => {
    try {
      let estate = await Estate.create({
        address: address,
        address_jibun: address_jibun,
        lat: latLng.lat,
        lng: latLng.lng
      });

      await ZoomLevelThree.create({
        estateId: estate.estateId,
        lat: latLng.zoomLevelThreeSwLat,
        lng: latLng.zoomLevelThreeSwLng,
      })

      await ZoomLevelFour.create({
        estateId: estate.estateId,
        lat: latLng.zoomLevelFourSwLat,
        lng: latLng.zoomLevelFourSwLng,
      })

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
    imageUrls,
    userId
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
        userId,
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

    imageUrls.map((image) => {
      ReviewImage.create({
        reviewId: review.reviewId,
        key: image.fileName,
        url: image.location,
      })
    })
    return { review, estateInfo }
  };

  getReview = async (estateId) => {
    try {

      //해당 건물에 달린 리뷰와 해당 건물에 대한 정보들을 불러온다.
      const reviews = await Review.findAll({
        where: {
          estateId: estateId
        }
      });

      if (!reviews) {
        const error = new Error(405, '존재하지 않는 estateId 입니다.')
        throw error;
      };

      const estateInfo = await EstateInfo.findAll({
        where: {
          estateId: estateId
        }
      });

      const estate = await Estate.findOne({
        where: {
          estateId: estateId
        },
        attributes: [
          "address_jibun"
        ]
      })

      return { reviews, estateInfo, estate };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  myReview = async (userId) => {
    try {
      const reviews = await Review.findAll({
        where: {
          userId: userId
        },
        attributes: [
          'star',
          'createdAt',
          'estateId',
          'reviewId'
        ]
      })

      let data = await Promise.all(reviews.map(async (review) => {
        const address = await Estate.findOne({
          where: {
            estateId: review.estateId
          },
          attributes: [
            'address_jibun'
          ]
        })
        review.dataValues.address = address.address_jibun
        console.log('kaka', review.dataValues)
        return review.dataValues
      }))
      return data;
    } catch (err) {
      throw err;
    }
  }

  findReview = async (reviewId) => {
    try {
      let review = await Review.findOne({
        where: {
          reviewId: reviewId
        }
      })

      return review;
    } catch (err) {
      throw err
    }
  }

  deleteReview = async (reviewId) => {
    try {
      const review = await Review.findOne({
        where: {
          reviewId: reviewId
        }
      })
      await Review.destroy({
        where: {
          reviewId: reviewId
        }
      })
      await Estate.destroy({
        where: {
          estateId: review.estateId
        }
      })

      await EstateInfo.destroy({
        where: {
          reviewId: reviewId
        }
      })

      await ReviewImage.destroy({
        where: {
          reviewId: reviewId
        }
      });
      await ZoomLevelFour.destroy({
        where: {
          estateId: review.estateId
        }
      });
      await ZoomLevelThree.destroy({
        where: {
          estateId: review.estateId
        }
      })
    } catch (err) {
      throw err
    }
  }
}

module.exports = ReviewRepository;
