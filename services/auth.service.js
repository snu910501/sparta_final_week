const axios = require('axios');
const createToken = require('../modules/createToken');
const AuthRepository = require('../repositories/auth.repository');

class AuthService {
  authRepository = new AuthRepository();
  kakaoLogin = async (code) => {
    try {
      const {
        data: { access_token: kakaoAccessToken },
      } = await axios('https://kauth.kakao.com/oauth/token', {
        params: {
          grant_type: 'authorization_code',
          client_id: '5f22609165e514fa6ee0ec5b74289043',
          // + '?platform=kakao'
          redirect_uri: 'http://localhost:3000/auth/kakao',
          code: code,
        },
        // headers: {
        //   'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        // }
      }); //액세스 토큰을 받아온다
      const { data: kakaoUser } = await axios(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
          },
        },
      );
      console.log('hhh', kakaoUser);

      const snsId = kakaoUser.id;
      const nickname = kakaoUser.properties.nickname;
      const email = kakaoUser.kakao_account.email;

      let userExist = await this.authRepository.findUser(email);

      if (userExist) {
        const token = await createToken(userExist.userId, nickname, email);
        return token;
      } else {
        const user = await this.authRepository.createUser(snsId, nickname, email);
        const token = await createToken(user.userId, nickname, email);
        return token;
      }
    } catch (err) {
      console.log('AuthService kakaoLogin Error', err);
      throw err;
    }
  };
}

module.exports = AuthService;
