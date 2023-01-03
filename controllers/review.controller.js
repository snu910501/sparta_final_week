const ReviewService = require('../services/review.service');

class ReviewController {
  reviewService = new ReviewService();

  createReview = async (req, res) => {
    try {

      const { address, text, stars, residence_type, transaction_type, deposit, monthly_payment, acreage, bug, safe, communication, floor_noise, walls_noise, town_noise, mold, parking } = req.body;
      const images = req.files;

      let review = await this.reviewService.createReview(address, text, stars, residence_type, transaction_type, deposit, monthly_payment, acreage, bug, safe, communication, floor_noise, walls_noise, town_noise, mold, parking)
      console.log(review)
    } catch (err) {
      console.log('CreateController error');
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage })
      } else {
        return res.status(500).json({ errorMessage: 'error' })
      }
    }

  };
}

module.exports = ReviewController