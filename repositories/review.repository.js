const Review = require('../models/review');
const EstateInfo = require('../models/estateInfo');
const Estate = require('../models/estate');

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

  createEstate = async (address) => {
    try {
      let estate = await Estate.create({ address });
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
    let review = await Review.create(
      {
        estateId,
        // nickname,
        text,
        stars,
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
        bug,
        safe,
        communication,
        floor_noise,
        walls_noise,
        town_noise,
        mold,
        parking
      }
    )
    return { review, estateInfo }
  };
}

module.exports = ReviewRepository;
