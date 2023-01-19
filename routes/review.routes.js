const express = require('express');
const multer = require('multer')
const { isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

const EstateController = require("../controllers/review.controller");
const estateController = new EstateController();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.post('/', upload.array('images', 5), estateController.createReview)
router.get('/items/:estateId', estateController.getReview)
router.get('/myReview', isLoggedIn, estateController.myReview)

module.exports = router;