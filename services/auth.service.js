const axios = require('axios');
const AuthRepository = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository(Users);
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

    if (!existUser) {
      const newUser = await this.authRepository.createUser({
        snsId: data.id,
        nickname: data.properties.nickname,
        email: data.kakao_account.email,
        profileImg: data.properties.profile_image,
      });
      accessToken = jwt.sign(
        { userId: newUser.userId, nickname: newUser.nickname },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: '12h',
        },
      );
      const { userId, nickname, email, profileImg } = newUser;
      return {
        userId,
        nickname,
        email,
        profileImg,
        accessToken,
      };
    }
    if (existUser) {
      accessToken = jwt.sign(
        { userId: existUser.userId, nickname: existUser.nickname },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: '12h',
        },
      );
      const { userId, nickname, email, profileImg } = existUser;
      return {
        userId,
        nickname,
        email,
        profileImg,
        accessToken,
      };
    }
  };
}

module.exports = AuthService;
