const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY } = process.env;
const { customError } = require('./customError');

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next(new customError('로그인 필요', 401));

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer')
      throw new customError('토큰 유효성검사 실패', 400);

    try {
      res.locals = jwt.verify(authToken, ACCESS_SECRET_KEY).userId;
      next();
    } catch (err) {
      next(new customError('로그인 필요', 401));
    }
  } catch (err) {
    next(err);
  }
};

const isNotLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) next();

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer')
      throw new customError('토큰 유효성검사 실패', 401);

    try {
      jwt.verify(authToken, ACCESS_SECRET_KEY);
      next(new customError('이미 로그인 되어있음', 400));
    } catch (err) {
      next(new customError('토큰 유효성검사 실패', 401));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };
