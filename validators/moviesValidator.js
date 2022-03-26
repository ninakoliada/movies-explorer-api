const { celebrate, Joi } = require('celebrate');

const createMovieValidator = celebrate({
  body: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.string().required(),
    trailerLink: Joi.string().required().uri(),
  },
});

const movieDeleteValidator = celebrate({
  params: {
    id: Joi.string().hex().length(24),
  },
});

module.exports = { createMovieValidator, movieDeleteValidator };
