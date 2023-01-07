const passport = require('passport');
const kakao = require('./kakaoStrategy');
const db = require('../models');

module.exports = () => {
  passport.serializeUser((req, user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((req, id, done) => {
    db.Users.findOne({ where: { snsId: id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  kakao();
};
