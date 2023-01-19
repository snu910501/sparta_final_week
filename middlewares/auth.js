const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY } = process.env;
const { unauthorized, badRequest } = require('@hapi/boom');

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('hihi', authorization);
    if (!authorization) throw unauthorized('로그인 필요');

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw badRequest('토큰 유효성검사 실패');

    try {
      res.locals = jwt.verify(authToken, ACCESS_SECRET_KEY);
      next();
    } catch (err) {
      next(unauthorized('토큰 유효성검사 실패'));
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
    if (authType !== 'Bearer') throw badRequest('토큰 유효성검사 실패');

    try {
      jwt.verify(authToken, ACCESS_SECRET_KEY);
      next(badRequest('이미 로그인 되어 있음'));
    } catch (err) {
      next(badRequest('토큰 유효성검사 실패'));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };
