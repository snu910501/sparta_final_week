const AuthRepository = require('../repositories/auth.repository');
const RefreshRepository = require('../repositories/refresh.repository');
const { Users } = require('../models');
const { Refreshs } = require('../models');
const jwtOption = require('../modules/jwtOption');
const { badRequest, unauthorized } = require('@hapi/boom');
const SALT = parseInt(process.env.SALT);

class RefreshService {
  constructor(bcryptMudule) {
    this.bcrypt = bcryptMudule;
  }
  authRepository = new AuthRepository(Users);
  refreshRepository = new RefreshRepository(Users, Refreshs);

  checkToken = async (accessToken, userkey) => {
    const isUser = await this.refreshRepository.findByUserKey(userkey);
    if (!isUser) throw unauthorized('로그인 필요1');

    const userInfo = jwtOption.accessTokenDecoded(accessToken);
    const compareId = await this.bcrypt.compare(
      toString(userInfo.userId),
      userkey,
    );
    if (!compareId) throw badRequest('토큰 정보가 유효하지 않음');

    const refreshVerify = jwtOption.refreshTokenVerify(isUser.refreshToken);
    if (!refreshVerify) throw unauthorized('로그인 필요2');

    let newAccessToken = '';
    let newRefreshToken = '';
    let newUserKey = '';

    newRefreshToken = await jwtOption.createRefreshToken();
    newUserKey = await this.bcrypt.hash(toString(userInfo.userId), SALT);
    await this.refreshRepository.updateRefreshToken(
      isUser.refreshId,
      newUserKey,
      newRefreshToken,
    );

    newAccessToken = await jwtOption.createAccessToken(
      userInfo.userId,
      userInfo.email,
    );

    return {
      accessToken: newAccessToken,
      userkey: newUserKey,
      userId: userInfo.userId,
      email: userInfo.email,
    };
  };
}

module.exports = RefreshService;
