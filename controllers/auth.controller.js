const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService();

  kakaoLogin = async (req, res) => {
    try {
      const { code } = req.query;
      console.log('zzz', code)
      let result = await this.authService.kakaoLogin(code);
      return res.status(200).json({ token: result })

    } catch (err) {
      console.log('AuthController kakaoLogin Error', err);
      throw err;
    }
  };
}

module.exports = AuthController;