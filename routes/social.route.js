const express = require('express');
const router = express.Router();
const passport = require('passport');
const socialLogin = require('../controllers/kakao.login.controller');

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', socialLogin.kakaoCallback);

module.exports = router;
