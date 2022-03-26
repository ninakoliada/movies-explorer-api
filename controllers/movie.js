const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const Movies = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const data = await Movies.find();

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      trailerLink,
    } = req.body;

    const movie = await Movies.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      trailerLink,
      owner: req.user._id,
    });

    return res.send(movie);
  } catch (error) {
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id });

    if (!movie) {
      return next(new NotFoundError('Запрашиваемый фильм не найден'));
    }

    if (String(movie.owner) !== req.user._id) {
      return next(new ForbiddenError('Нет прав на удаление этого фильма'));
    }

    await movie.remove();
    return res.send(movie);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
