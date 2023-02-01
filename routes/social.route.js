const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.get('/kakao/callback', authController.kakaoLogin, (req, res) => {
  const { accessToken, userkey } = req.cookies;
  res.setHeader(
    'Set-Cookie',
    `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None`,
  );
  res.setHeader(
    'Set-Cookie',
    `userkey=${userkey}; Path=/; HttpOnly; Secure; SameSite=None`,
  );
  res.redirect('/');
});

router.post('/logout', authController.logout);

module.exports = router;
