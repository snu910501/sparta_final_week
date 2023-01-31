const jwtOption = require('../modules/jwtOption');
const bcrypt = require('bcryptjs');
const AuthService = require('../services/auth.service');
class AuthController {
  constructor() {
    this.authService = new AuthService(bcrypt);
  }

  kakaoLogin = async (req, res, next) => {
    try {
      const { code } = req.query;
      const result = await this.authService.kakaoLogin(code);
      // console.log(result);
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
        userkey: result.userkey,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
