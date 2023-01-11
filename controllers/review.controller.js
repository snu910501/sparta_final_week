const ReviewService = require('../services/review.service');

class ReviewController {
  reviewService = new ReviewService();

  createReview = async (req, res) => {
    try {
      const {
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
      } = req.body;
      const images = req.files;

      let review = await this.reviewService.createReview(
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
      return res.status(200).json({ result: true });
    } catch (err) {
      console.log('CreateController error');
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage });
      } else {
        return res.status(500).json({ errorMessage: 'error' });
      }
    }
  };
}

module.exports = ReviewController;
