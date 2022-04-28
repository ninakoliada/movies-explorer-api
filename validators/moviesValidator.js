const { celebrate, Joi } = require('celebrate');
const urlValidator = require('./utils/urlValidator');

const createMovieValidator = celebrate({
  body: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: urlValidator,
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: urlValidator,
    movieId: Joi.number().required(),
    trailerLink: urlValidator,
  },
});

const movieDeleteValidator = celebrate({
  params: {
    id: Joi.string().hex().length(24),
  },
});

module.exports = { createMovieValidator, movieDeleteValidator };
