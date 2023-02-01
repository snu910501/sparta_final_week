const { badRequest } = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const RefreshService = require('../services/refresh.service');
class RefreshController {
  constructor() {
    this.refreshService = new RefreshService(bcrypt);
  }

  checkToken = async (req, res, next) => {
    try {
      const { accessToken, userkey } = req.cookies;
      const result = await this.refreshService.checkToken(accessToken, userkey);

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
      //   `refresh: accessToken=${result.accessToken}; userkey=${result.userkey}`,
      // );
      // console.log(`userkey=${result.userkey}`);

      return {
        userId: result.userId,
        email: result.email,
        accessToken: result.accessToken,
      };
    } catch (err) {
      next(err);
    }
  };
}

module.exports = RefreshController;
