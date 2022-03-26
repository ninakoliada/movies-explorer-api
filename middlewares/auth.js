const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
};

module.exports = auth;
