const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 120 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
