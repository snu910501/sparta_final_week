const ReviewRepository = require('../repositories/review.repository');
const reviewValidate = require('../modules/reviewValidate');
const imagesValidate = require('../modules/imagesValidate');
const administrativeDistrict = require("../static/administrativeDistrict");
const addressToGeO = require('../modules/addressToGeo');
const clustering = require("../modules/clustering");
const uploadImageToS3 = require('../modules/uploadImageToS3');
const ReviewImage = require('../models/reviewImage');
const Error = require('../modules/error');

class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async (
    address,
    address_jibun,
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
    good,
    bad,
    star,
    images,
    userId
  ) => {
    try {
      // 리뷰 요소에 대한 유효성 검사
      await reviewValidate(
        address,
        address_jibun,
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
        good,
        bad,
        star,
        images,
      );

      // 이미지에 대한 유효성 검사를 실시함
      await imagesValidate(images);

      const imageUrls = await uploadImageToS3(images)
      // 지번 주소를 가지고 나눠서 도/시/동 으로 행정구역을 나눠서 저장을 한다.
      const doCityDong = address_jibun.split(' ');

      // 광역시들은 도가 없기 때문에 구분해준다.
      if (administrativeDistrict.includes(doCityDong[0])) {
        await this.reviewRepository.createDo(doCityDong[0], await addressToGeO(doCityDong[0]));
        await this.reviewRepository.createCity(doCityDong[0], await addressToGeO(doCityDong[0]));
        await this.reviewRepository.createDong(doCityDong[2], await addressToGeO(doCityDong[2]));
      } else {
        await this.reviewRepository.createDo(doCityDong[0], await addressToGeO(doCityDong[0]));
        await this.reviewRepository.createCity(doCityDong[1], await addressToGeO(doCityDong[1]));
        await this.reviewRepository.createDong(doCityDong[2], await addressToGeO(doCityDong[2]));
      }

      // 건물에다가 후기를 다는 로직이기 때문에, 만약 어느 건물에 후기가 달린적이 없다면
      // 그 건물은 생성되어 있지 않을 것이고, 달린적이 있다면 건물은 생성되어 있을것
      let reviewExist = await this.reviewRepository.findEstate(address);


      // 건물이 생성되어 있는것을 확인 했다면, 건물의 id값을 함께 넘겨서 후기를 생성한다.
      if (reviewExist) {

        let review = await this.reviewRepository.createReview(
          reviewExist.estateId,
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
        );
        return review;
      } else {

        // 생성된 건물이 없다면 건물을 생성해서 estateId 값을 넘긴다.
        let estate = await this.reviewRepository.createEstate(address, address_jibun, await clustering(address));
        let review = await this.reviewRepository.createReview(
          estate.estateId,
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
        );
        return review;
      }
    } catch (err) {
      console.log('ReviewService CreateReview Error');
      console.log(err);
      throw err;
    }
  };

  getReview = async (estateId) => {
    const reviewEstateInfoEstate = await this.reviewRepository.getReview(estateId);

    const reviews = reviewEstateInfoEstate.reviews;
    const estateInfos = reviewEstateInfoEstate.estateInfo;
    const estate = reviewEstateInfoEstate.estate;


    // review에 imageUrl을 넣어주는 코드
    let reviewArr = await Promise.all(
      reviews.map(async (review) => {
        const reviewImages = await ReviewImage.findAll({
          where: {
            reviewId: review.reviewId,
          },
          attributes: ["url", "reviewId"]
        })
        review.dataValues.imageUrl = [];
        reviewImages.map(async (r) => {
          review.dataValues.imageUrl.push(r.dataValues.url)
        })
        return await review.dataValues
      })
    )

    // estateInfo는 평균점수를 내야하기 때문에 estateInfo라는 객체를 만들고
    // 각자 합산해서 길이만큼 나눠서 평균값들을 구햇따.
    const estateInfo = {
      communication: 0,
      bug: 0,
      smell: 0,
      floor_noise: 0,
      walls_noise: 0,
      town_noise: 0,
      mold: 0,
      parking: 0,
      safe: 0,
    }

    let estateInfoArr = await Promise.all(
      estateInfos.map(async (e) => {
        estateInfo.communication += e.communication,
          estateInfo.bug += e.bug,
          estateInfo.smell += e.smell,
          estateInfo.floor_noise += e.floor_noise,
          estateInfo.walls_noise += e.walls_noise,
          estateInfo.town_noise += e.town_noise,
          estateInfo.mold += e.mold,
          estateInfo.parking += e.parking,
          estateInfo.safe += e.safe

        return estateInfo
      })
    )
    for (let key in estateInfoArr[0]) {

      estateInfoArr[0][key] /= estateInfos.length;
    }

    estateInfoArr = estateInfoArr[0]
    return { reviewArr, estateInfoArr, estate }
  }

  myReview = async (userId) => {
    try {
      const reviews = await this.reviewRepository.myReview(userId);
      return reviews;
    } catch (err) {
      throw err;
    }
  }

  deleteReview = async(reviewId, userId) => {
    try{
      const review =  await this.reviewRepository.findReview(reviewId);

      if(review) {
        if(review.userId == userId ) {
          await this.reviewRepository.deleteReview(reviewId);
          return {message : '삭제 성공'};
        } else {
          const error = new Error('405', '자신의 후기만 삭제가 가능합니다.')
          throw error;
        }
      } else {
        const error = new Error('405', '후기가 존재하지 않습니다.')
        throw error;
      }
    } catch(err) {
      throw err;
    }
  }
}

module.exports = ReviewService;
