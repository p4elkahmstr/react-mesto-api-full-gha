const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'some-secret-key' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, SECRET_KEY, { expiresIn: '7d' });
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
};
