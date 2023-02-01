const axios = require('axios');
const AuthRepository = require('../repositories/auth.repository');
const RefreshsRepository = require('../repositories/refresh.repository');
const { Users, Refreshs } = require('../models');
const jwtOption = require('../modules/jwtOption');
const { badRequest } = require('@hapi/boom');
const SALT = parseInt(process.env.SALT);
const { KAKAO_ID, REDIRECT_URI } = process.env;
class AuthService {
  constructor(bcryptMudule) {
    this.bcrypt = bcryptMudule;
  }
  authRepository = new AuthRepository(Users, Refreshs);
  refreshsRepository = new RefreshsRepository(Users, Refreshs);

  kakaoLogin = async (code) => {
    const config = {
      client_id: KAKAO_ID,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const result = await axios({
      method: 'post',
      url: `https://kauth.kakao.com/oauth/token?${params}`,
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => {
      return response.data;
    });

    const { data } = await axios({
      method: 'get',
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    });
    const existUser = await this.authRepository.findByUser(data.id);

    let accessToken = '';
    let refreshToken = '';
    let newUserKey = '';

    if (!existUser) {
      const newUser = await this.authRepository.createUser(
        data.id,
        data.kakao_account.email,
      );

      const { userId, email } = newUser;
      accessToken = await jwtOption.createAccessToken(userId, email);
      newUserKey = await this.bcrypt.hash(toString(userId), SALT);
      refreshToken = await jwtOption.createRefreshToken();
      await this.refreshsRepository.createRefresh(newUserKey, refreshToken);

      return {
        userId,
        email,
        accessToken,
        userkey: newUserKey,
      };
    }

    if (existUser) {
      const { userId, email } = existUser;
      accessToken = await jwtOption.createAccessToken(userId, email);
      newUserKey = await this.bcrypt.hash(toString(userId), SALT);

      refreshToken = await jwtOption.createRefreshToken();
      await this.refreshsRepository.createRefresh(newUserKey, refreshToken);

      return {
        userId,
        email,
        accessToken,
        userkey: newUserKey,
      };
    }
  };

  logout = async (userkey) => {
    const result = await this.refreshsRepository.findByUserKey(userkey);
    if (!result) throw badRequest('로그인 필요3');
    await this.refreshsRepository.deleteRefresh(result.userId);

    return { msg: '로그아웃 성공' };
  };
}

module.exports = AuthService;
