const ReviewRepository = require('../repositories/review.repository');

const reviewValidate = require('../modules/reviewValidate');

class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async (
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
    } catch (err) {
      console.log('ReviewService CreateReview Error');
      console.log(err);
      throw err;
    }
  };
}

module.exports = ReviewService;
