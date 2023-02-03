const jwtOption = require('../modules/jwtOption');
const bcrypt = require('bcryptjs');
const AuthService = require('../services/auth.service');
const { unauthorized, badRequest } = require('@hapi/boom');
class AuthController {
  constructor() {
    this.authService = new AuthService(bcrypt);
  }

  kakaoLogin = async (req, res, next) => {
    try {
      const { code } = req.query;
      const result = await this.authService.kakaoLogin(code);

      if (result) {
        res.cookie('accessToken', `${result.accessToken}`, {
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        });
        res.cookie('userkey', `${result.userkey}`, {
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        });
      }
      // console.log(
      //   `auth: accessToken=${result.accessToken}; userkey=${result.userkey}`,
      // );
      // console.log(`userkey=${result.userkey}`);

      return res.status(200).json({
        userId: result.userId,
        email: result.email,
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(unauthorized('로그인 실패'));
    }
  };

  logout = async (req, res, next) => {
    try {
      const { userkey } = req.cookies;
      const result = await this.authService.logout(userkey);
      if (result.msg === '로그아웃 성공') {
        res.clearCookie('accessToken');
        res.clearCookie('userkey');
      }
      return res.status(200).json({ msg: '로그아웃 성공' });
    } catch (err) {
      return res.status(400).json({ errorMsg: '로그아웃 실패' });
    }
  };
}

module.exports = AuthController;
