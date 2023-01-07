const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { UnexpectedError } = require('./custom-exception');

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next(new UnexpectedError('LOGIN REQUIRED', 401));

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw new UnexpectedError('WRONG REQUEST', 400);

    try {
      res.locals = jwt.verify(authToken, SECRET_KEY);
      next();
    } catch (err) {
      next(new UnexpectedError('LOGIN REQUIRED', 401));
    }
  } catch (err) {
    next(err);
  }
};

const isNotLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next();

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw new UnexpectedError('WRONG REQUEST', 400);

    try {
      jwt.verify(authToken, SECRET_KEY);
      next(new UnexpectedError('ALREADY LOGGED IN', 400));
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };
