const ReviewRepository = require('../repositories/review.repository');
const reviewValidate = require('../modules/reviewValidate');
const imagesValidate = require('../modules/imagesValidate');

const addressToGeO = require('../modules/addressToGeo');

class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async (
    address,
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

      await imagesValidate(images);
      const latLng = await addressToGeO(address);
      console.log(latLng);
      // 건물에다가 후기를 다는 로직이기 때문에, 만약 어느 건물에 후기가 달린적이 없다면
      // 그 건물은 생성되어 있지 않을 것이고, 달린적이 있다면 건물은 생성되어 있을것
      let reviewExist = await this.reviewRepository.findEstate(address);

      // 건물이 생성되어 있는것을 확인 했다면, 건물의 id값을 함께 넘겨서 생성한다.
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
        let estate = await this.reviewRepository.createEstate(address, latLng);
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
