const jwt = require('jsonwebtoken');

const createAccessToken = async (userId, nickname) => {
  const accessToken = jwt.sign(
    { userId, nickname },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: '1h',
    },
  );
  return accessToken;
};

const createRefreshToken = async () => {
  const refreshToken = jwt.sign({}, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '1d',
  });
  return refreshToken;
};

module.exports = { createAccessToken, createRefreshToken };
