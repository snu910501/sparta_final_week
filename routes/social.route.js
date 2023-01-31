const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.get('/kakao/callback', authController.kakaoLogin, (req, res) => {
  res.redirect('/');
});

// router.get('/logout', authController.logout);

module.exports = router;
