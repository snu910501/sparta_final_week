const rateLimite = require('express-rate-limit');

exports.postCUDApiLimiter = rateLimite({
  windowMs: 60 * 1000,
  max: 10,
  handler(req, res, next, option) {
    res.status(option.statusCode).json({ errorMsg: '요청 많음' });
  },
});

exports.getApiLimiter = rateLimite({
  windowMs: 1 * 1000,
  max: 10,
  handler(req, res, next, option) {
    res.status(option.statusCode).json({ errorMsg: '조회 요청 많음' });
  },
});

exports.commentCUDApiLimiter = rateLimite({
  windowMs: 30 * 1000,
  max: 10,
  handler(req, res, next, option) {
    res.status(option.statusCode).json({ errorMsg: '요청 많음' });
  },
});
