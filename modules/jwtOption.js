const { badRequest } = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const createAccessToken = async (userId, email) => {
  const accessToken = jwt.sign({ userId, email }, ACCESS_SECRET_KEY, {
    expiresIn: '30m',
  });
  return accessToken;
};

const createRefreshToken = async () => {
  const refreshToken = jwt.sign({}, REFRESH_SECRET_KEY, {
    expiresIn: '14d',
  });
  return refreshToken;
};

const accessTokenVerify = (accessToken) => {
  try {
    const accessVerify = jwt.verify(accessToken, ACCESS_SECRET_KEY);
    if (!accessVerify) {
      throw badRequest('토큰 정보가 존재하지 않음');
    }
    return accessVerify;
  } catch (err) {
    return { message: err.message };
  }
};

const refreshTokenVerify = (refreshToken) => {
  try {
    const refreshVerify = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    if (!refreshVerify) {
      throw badRequest('토큰 정보가 존재하지 않음');
    }
    return refreshVerify;
  } catch (err) {
    return { message: err.message };
  }
};

const accessTokenDecoded = (accessToken) => {
  try {
    const accessDecoded = jwt.decode(accessToken);
    if (!accessDecoded) {
      throw badRequest('토큰 정보가 존재하지 않음');
    }
    return accessDecoded;
  } catch (err) {
    return { message: err.message };
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  accessTokenVerify,
  refreshTokenVerify,
  accessTokenDecoded,
};
