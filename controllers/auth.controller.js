const AuthService = require('../services/auth.service');
class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  kakaoLogin = async (req, res, next) => {
    try {
      const { code } = req.query;
      const result = await this.authService.kakaoLogin(code);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
