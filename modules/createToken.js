const jwt = require('jsonwebtoken');

module.exports = createToken = async (userId, nickname, email) => {
  const token = jwt.sign(
    {
      userId: userId,
      nickname: nickname,
      email: email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1d',
    },
  );

  return token
};
