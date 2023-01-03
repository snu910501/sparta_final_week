const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const jwtVerify = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');
  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다1',
    });
    return;
  }
  // 토큰이 변조되었는지, 토큰이 일치하는지 SECRET_KEY로 검증
  try {
    const { userId } = jwt.verify(authToken, SECRET_KEY);
    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    console.log('error인증실패: ', error);

    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다2',
    });
  }
};

module.exports = jwtVerify;