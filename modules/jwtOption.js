const jwt = require('jsonwebtoken');

const createAccessToken = async (userId, email) => {
  const accessToken = jwt.sign(
    { userId, email },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: '1d',
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
