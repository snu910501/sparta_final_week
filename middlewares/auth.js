const jwtOption = require('../modules/jwtOption');
const Refreshcontroller = require('../controllers/refresh.controller');
const refreshcontroller = new Refreshcontroller();
const { unauthorized, badRequest } = require('@hapi/boom');

const isLoggedIn = async (req, res, next) => {
  try {
    const { accessToken, userkey } = req.cookies;

    // 둘 다 없는 경우 로그인이 되어있지 않음으로 판단
    if (!userkey && !accessToken) throw unauthorized('로그인 필요');

    // 유저키가 없는 경우는 비정상 접근으로 판단
    if (!userkey && accessToken) {
      res.cookie('accessToken', '', {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 0,
      });
      res.cookie('userkey', '', {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 0,
      });
      throw badRequest('비정상 접근');
    }

    if (userkey) {
      const accessTokenVerify = jwtOption.accessTokenVerify(accessToken);
      if (accessTokenVerify.message === 'jwt expired') {
        const result = await refreshcontroller.checkToken(req, res, next);
        if (result) {
          res.locals = result;
        }
      } else {
        res.locals = accessTokenVerify;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

const isNotLoggedIn = (req, res, next) => {
  try {
    const { accessToken, userkey } = req.cookies;

    // 둘 다 없는 경우 로그인이 되어있지 않음으로 판단
    if (!accessToken && !userkey) next();

    // 토큰과 유저키 둘 중 하나만 없는 경우는 비정상 접근으로 판단
    if (!userkey) {
      res.clearCookie('accessToken');
      res.clearCookie('userkey');
      throw badRequest('비정상 접근');
    }
    const accessVerified = jwtOption.accessTokenVerify(accessToken);
    if (accessVerified) {
      throw badRequest('이미 로그인 됨');
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };
