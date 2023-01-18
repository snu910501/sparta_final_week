const axios = require('axios');
const AuthRepository = require('../repositories/auth.repository');
const { Users } = require('../models');
const { Refreshs } = require('../models');
const createToken = require('../modules/jwt');

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

    const existUser = await this.authRepository.findByUser(
      data.kakao_account.email,
    );

    let accessToken = '';
    let refreshToken = '';

    if (!existUser) {
      const newUser = await this.authRepository.createUser({
        snsId: data.id,
        nickname: data.properties.nickname,
        email: data.kakao_account.email,
        profileImg: data.properties.profile_image,
      });

      const { userId, nickname, email, profileImg } = newUser;
      accessToken = await createToken.createAccessToken(
        newUser.userId,
        newUser.nickname,
      );
      refreshToken = await createToken.createRefreshToken();
      await this.authRepository.createRefreshToken({
        userId: newUser.userId,
        refreshToken,
      });
      return {
        userId,
        nickname,
        email,
        profileImg,
        accessToken,
        refreshToken,
      };
    }
    if (existUser) {
      const { userId, nickname, email, profileImg } = existUser;
      accessToken = await createToken.createAccessToken(
        existUser.userId,
        existUser.nickname,
      );
      refreshToken = await createToken.createRefreshToken();
      await this.authRepository.updateToken({
        userId: existUser.userId,
        refreshToken,
      });
      return {
        userId,
        nickname,
        email,
        profileImg,
        accessToken,
        refreshToken,
      };
    }
  };
}

module.exports = AuthService;
