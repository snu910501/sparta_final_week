const ReviewRepository = require('../repositories/review.repository');
const reviewValidate = require('../modules/reviewValidate');
const imagesValidate = require('../modules/imagesValidate');
const administrativeDistrict = require("../static/administrativeDistrict");
const addressToGeO = require('../modules/addressToGeo');

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

        );
        return review;
      } else {

        // 생성된 건물이 없다면 건물을 생성해서 estateId 값을 넘긴다.
        let estate = await this.reviewRepository.createEstate(address, address_jibun, await addressToGeO(address));
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

        );
        return review;
      }
    } catch (err) {
      console.log('ReviewService CreateReview Error');
      console.log(err);
      throw err;
    }
  };
}

module.exports = ReviewService;
