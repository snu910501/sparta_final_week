const axios = require('axios');
const AuthRepository = require('../repositories/auth.repository');
const { Users } = require('../models');
const { Refreshs } = require('../models');
const jwtOption = require('../modules/jwtOption');

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository(Users, Refreshs);
  }

  kakaoLogin = async (code) => {
    const config = {
      client_id: process.env.KAKAO_ID,
      grant_type: 'authorization_code',
      redirect_uri: `http://localhost:3000/auth/kakao/callback`,
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

    if (!existUser) {
      const newUser = await this.authRepository.createUser(
        data.id,
        data.kakao_account.email,
      );

      const { userId, email } = newUser;
      accessToken = await jwtOption.createAccessToken(userId, email);
      refreshToken = await jwtOption.createRefreshToken();
      await this.authRepository.createRefreshToken({
        userId,
        refreshToken,
      });
      return {
        userId,
        email,
        accessToken,
        refreshToken,
      };
    }
    if (existUser) {
      const { userId, email } = existUser;
      accessToken = await jwtOption.createAccessToken(userId, email);
      refreshToken = await jwtOption.createRefreshToken();
      await this.authRepository.updateToken({
        userId,
        refreshToken,
      });
      return {
        userId,
        email,
        accessToken,
        refreshToken,
      };
    }
  };
}

module.exports = AuthService;
