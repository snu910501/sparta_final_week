const ReviewRepository = require('../repositories/review.repository');

const reviewValidate = require('../modules/reviewValidate');

class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async (
    address,
    text,
    stars,
    residence_type,
    transaction_type,
    deposit,
    monthly_payment,
    acreage,
    bug,
    safe,
    communication,
    floor_noise,
    walls_noise,
    town_noise,
    mold,
    parking,
  ) => {
    try {
      await reviewValidate(
        text,
        stars,
        residence_type,
        transaction_type,
        deposit,
        monthly_payment,
        acreage,
        bug,
        safe,
        communication,
        floor_noise,
        walls_noise,
        town_noise,
        mold,
        parking,
      );

      // 건물에다가 후기를 다는 로직이기 때문에, 만약 어느 건물에 후기가 달린적이 없다면
      // 그 건물은 생성되어 있지 않을 것이고, 달린적이 있다면 건물은 생성되어 있을것
      let reviewExist = await this.reviewRepository.findEstate(address);

      // 건물이 생성되어 있는것을 확인 했다면, 건물의 id값을 함께 넘겨서 생성한다.
      if (reviewExist) {
        let review = await this.reviewRepository.createReview(
          reviewExist.estateId,
          text,
          stars,
          residence_type,
          transaction_type,
          deposit,
          monthly_payment,
          acreage,
          bug,
          safe,
          communication,
          floor_noise,
          walls_noise,
          town_noise,
          mold,
          parking,
        );
        return review;
      } else {
        // 생성된 건물이 없다면 건물을 생성해서 estateId 값을 넘긴다.
        let estate = await this.reviewRepository.createEstate(address);
        let review = await this.reviewRepository.createReview(
          estate.estateId,
          text,
          stars,
          residence_type,
          transaction_type,
          deposit,
          monthly_payment,
          acreage,
          bug,
          safe,
          communication,
          floor_noise,
          walls_noise,
          town_noise,
          mold,
          parking,
        );
        return review
      }
    } catch (err) {
      console.log('ReviewService CreateReview Error');
      console.log(err);
      throw err;
    }
  };
}

module.exports = ReviewService;
