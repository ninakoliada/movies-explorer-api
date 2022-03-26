const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const { JWT_SECRET, NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

const auth = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const payload = jwt.verify(token, isProd ? JWT_SECRET : 'some-secret-key');
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
};

module.exports = auth;
