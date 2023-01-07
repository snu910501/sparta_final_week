const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config();

class socialLogin {
  kakaoCallback = (req, res, next) => {
    try {
      passport.authenticate(
        'kakao',
        { failureRedirect: '/' },
        async (err, user, info) => {
          if (err) return next(err);
          const { userId, nickname } = user;

          const accessToken = jwt.sign(
            { userId: userId },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: '2h' },
          );

          // const refreshToken = jwt.sign(
          //   { userId: userId },
          //   process.env.SECRET_KEY,
          //   { expiresIn: '2d' },
          // );
          // (await Users.update(
          //   { refreshToken },
          //   { where: { userId: userId } },
          // ));

          const result = { userId, accessToken, nickname };
          res.status(201).json({
            result: result,
            msg: '카카오 로그인에 성공하였습니다.',
          });
        },
      )(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: 'fail' });
    }
  };
}

module.exports = new socialLogin();
