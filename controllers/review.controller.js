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
      const userId = res.locals.userId

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
        userId
      );
      return res.status(200).json({ result: true });
    } catch (err) {
      console.log('CreateController error', err);
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage });
      } else {
        return res.status(500).json({ errorMessage: 'error' });
      }
    }
  };

  getReview = async (req, res) => {
    try {
      const estateId = req.params.estateId;

      const reviews = await this.reviewService.getReview(estateId);
      return res.status(200).json({ data: reviews })
    } catch (err) {
      console.log('CreateController error');
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage });
      } else {
        return res.status(500).json({ errorMessage: 'error' });
      }
    }
  }

  myReview = async (req, res) => {
    try {
      const userId = res.locals.userId
      console.log('hi hi', userId);
      const reviews = await this.reviewService.myReview(userId);

      return res.status(200).json({ data: reviews })
    } catch (err) {
      console.log('CreateController error', err);
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage });
      } else {
        return res.status(500).json({ errorMessage: 'error' });
      }
    }
  }

  deleteReview = async (req, res) => {
    try {

      const reviewId = req.params.reviewId;
      const userId = res.locals.userId;
      const result = await this.reviewService.deleteReview(reviewId, userId);
      return res.status(200).json(result);
    } catch (err) {
      console.log('CreateController deleteReview error', err);
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage });
      } else {
        return res.status(500).json({ errorMessage: 'error' });
      }
    }
  }
}


module.exports = ReviewController;
